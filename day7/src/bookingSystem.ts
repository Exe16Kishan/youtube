type RoomType = "SINGLE" | "DOUBLE";
type RoomAvailability = "AVAILABLE" | "UNAVAILABLE";
type BookingStatus = "CONFIRMED" | "CANCELLED";

interface Room {
  id: string;
  roomType: RoomType;
  price: number;
  availability: RoomAvailability;
  isAvailable(): boolean;
  book(): void;
  makeAvailable(): void;
  getPrice(): number;
}

class SingleRoom implements Room {
  constructor(
    public readonly id: string,
    public readonly roomType: RoomType,
    public readonly price: number,
    public availability: RoomAvailability = "AVAILABLE", // by default it is available
  ) {}
  isAvailable(): boolean {
    return this.availability === "AVAILABLE";
  }

  book(): void {
    this.availability = "UNAVAILABLE";
  }

  makeAvailable(): void {
    this.availability = "AVAILABLE";
  }

  getPrice(): number {
    return this.price;
  }
}

class DoubleRoom implements Room {
  constructor(
    public readonly id: string,
    public readonly roomType: RoomType,
    public readonly price: number,
    public availability: RoomAvailability = "AVAILABLE", // by default it is available
  ) {}
  isAvailable(): boolean {
    return this.availability === "AVAILABLE";
  }

  book(): void {
    this.availability = "UNAVAILABLE";
  }

  makeAvailable(): void {
    this.availability = "AVAILABLE";
  }

  getPrice(): number {
    return this.price;
  }
}

// customer

class Customer {
  bookings: Booking[] = [];
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  addBooking(newBooking: Booking) {
    this.bookings.push(newBooking);
  }

  getBooking() {
    console.log({ ...this.bookings });
  }
}

// booking class

class Booking {
  public status: BookingStatus | null = null;
  public totalPrice: number = 0;
  constructor(
    public readonly id: string,
    public customer: Customer,
    public room: Room,
    public numberOfDays: number,
  ) {}

  calculateTotal(): number {
    this.totalPrice = this.numberOfDays * this.room.getPrice();
    return this.totalPrice;
  }
  confirm() {
    this.status = "CONFIRMED";
  }

  cancel() {
    this.status = "CANCELLED";
    this.room.makeAvailable();
  }

  getStatus() {
    console.log(this.status);
  }
}

class Hotel {
  rooms: Map<string, Room> = new Map();
  bookings: Map<string, Booking> = new Map();
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  addRoom(room: Room) {
    this.rooms.set(room.id, room);
  }
  removeRoom(roomId: string) {
    this.rooms.delete(roomId);
  }
  findRoom(roomId: string) {
    return this.rooms.get(roomId);
  }
  getAvailableRoom() {
    const rooms = [...this.rooms.values()].filter(
      (room) => room.availability == "AVAILABLE",
    );

    console.log(rooms);
  }
  createBooking(customer: Customer, roomId: string, days: number) {
    const room = this.rooms.get(roomId);

    if (!room) {
      console.log("no room found with this id");
      return;
    }
    if (!room.isAvailable()) {
      console.log(room.availability);
      console.log("room is currently unavailable");
      return;
    }

    if (days <= 0) {
      console.log("days cannot be zero");
      return;
    }

    room.book();
    let bookingId = room.id + customer.name;
    const newBooking = new Booking(bookingId, customer, room, days);
    newBooking.confirm();
    // after we confirm booking lets add this to the booking hashtable
    this.bookings.set(newBooking.id, newBooking);
    customer.addBooking(newBooking); // we are doing this so that customer can have its booking details
    return newBooking;
  }
  cancelBooking(bookingId: string) {
    // first we have to make booking status cancel\
    const booking = this.bookings.get(bookingId);
    if (!booking) {
      console.log("no booking found for this id");
      return;
    }
    booking.cancel();
  }
  findBooking(bookingId: string) {
    const booking = this.bookings.get(bookingId);
    if (!booking) {
      console.log("no booking found");
      return;
    }

    console.log(booking);
  }
}

export { Booking, Customer, DoubleRoom, Hotel, SingleRoom };
