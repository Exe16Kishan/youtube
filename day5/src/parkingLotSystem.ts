type VehicleType = "Bike" | "Car" | "Truck";

class Vehicle {
  constructor(
    public id: string,
    public vehicleType: VehicleType,
  ) {}
}

interface ParkingSpot {
  isAvailable(): boolean;
  park(vehicle: Vehicle): void;
  removeVehicle(): void;
  getId(): string;
  canPark(vehicle: Vehicle): boolean;
  getVehicle(): Vehicle | null;
}

class BikeSpot implements ParkingSpot {
  // in this spot there can park a bike or it can b empty
  vehicle: Vehicle | null = null; // at starting it will b empty
  constructor(private id: string) {}

  getId() {
    return this.id;
  }

  isAvailable(): boolean {
    if (this.vehicle === null) {
      return true;
    }
    return false;
  }
  canPark(vehicle: Vehicle): boolean {
    return vehicle.vehicleType === "Bike"
  }

  park(vehicle: Vehicle): void {
    if (this.isAvailable() === false) {
      console.log("ParkingSpot Not available");
      return;
    }

    if (!this.canPark(vehicle)) {
      console.log(
        `vehicle type ${vehicle.vehicleType} cannot park in bikeSpot`,
      );
      return;
    }

    this.vehicle = vehicle;
  }

  removeVehicle(): void {
    this.vehicle = null;
  }

  getVehicle(): Vehicle | null {
    return this.vehicle;
  }

  //   what else we can write
}

class CarSpot implements ParkingSpot {
  // in this spot there can park a bike or it can b empty
  vehicle: Vehicle | null = null; // at starting it will b empty
  constructor(private id: string) {}

  getId() {
    return this.id;
  }

  isAvailable(): boolean {
      if (this.vehicle === null) {
        //   console.log("inside is available car")
          return true;
        }
    return false;
  }
  canPark(vehicle: Vehicle): boolean {
     return vehicle.vehicleType === "Car"
  }

  park(vehicle: Vehicle): void {
    if (this.isAvailable() === false) {
      console.log("ParkingSpot Not available");
      return;
    }

    if (!this.canPark(vehicle)) {
      console.log(`vehicle type ${vehicle.vehicleType} cannot park in CarSpot`);
      return;
    }

    this.vehicle = vehicle;
  }

  removeVehicle(): void {
    this.vehicle = null;
  }

  getVehicle(): Vehicle | null {
    return this.vehicle;
  }
}

class LargeSpot implements ParkingSpot {
  vehicle: Vehicle | null = null;
  constructor(private id: string) {}

  getId() {
    return this.id;
  }

  isAvailable(): boolean {
    if (this.vehicle === null) {
      return true;
    }
    return false;
  }
  canPark(vehicle: Vehicle): boolean {
    return vehicle.vehicleType === "Truck" || vehicle.vehicleType === "Car";
  }

  park(vehicle: Vehicle): void {
    if (!this.isAvailable()) {
      console.log("ParkingSpot Not available");
      return;
    }

    if (!this.canPark(vehicle)) {
      console.log(
        `vehicle type ${vehicle.vehicleType} cannot park in bikeSpot`,
      );
      return;
    }

    this.vehicle = vehicle;
  }

  removeVehicle(): void {
    this.vehicle = null;
  }

  getVehicle(): Vehicle | null {
    return this.vehicle;
  }
}

class Ticket {
  constructor(
    public id: string,
    public spotId: string,
    public vehicleId: string,
    public entryTime: Date = new Date(),
  ) {}
}

class ParkingLot {
  // parking lot have many parking spots , vehivle  and tickets also
  private spots: ParkingSpot[] = [];
  private parkedVehicles: Map<string, ParkingSpot> = new Map();
  private tickets: Map<string, Ticket> = new Map();
  constructor() {}

  addSpot(newSpot: ParkingSpot) {
    this.spots.push(newSpot);
  }

  removeSpot(spotId: string) {
    this.spots = this.spots.filter((spot) => spot.getId() !== spotId);
  }

  parkVehicle(newVehicle: Vehicle) {
    // lets search for the spot first
    const spot = this.findAvailableSpot(newVehicle);
    if (!spot) {
      console.log("No spot found for this vehicle type");
      return;
    }
    spot.park(newVehicle);
    // after parking we will generate a ticket
    const newTicket = new Ticket(
      `${newVehicle.id + newVehicle.vehicleType}`,
      spot.getId(),
      newVehicle.id,
    );

    // we have to assign this ticket with this vehicle

    this.parkedVehicles.set(newVehicle.id, spot);
    this.tickets.set(newTicket.id, newTicket);

    // after we print the ticket or return it
    return newTicket;
  }

  removeVehicle(vehicleId: string) {
    // he will show us ticket then he can unpark 
    // we got the spot 
    // saw if vehicle is parked or not
    // if parked then we empty the spot and removed the vehicle from the parking 
    // what else we can add ???

    const spot = this.parkedVehicles.get(vehicleId)
    if (!spot) {
        console.log("Vehicle is not parked ")
        return 
    }

    // if there is vehicle parked 
    // we will remove his vehicle from the spot
    spot.removeVehicle()
    this.parkedVehicles.delete(vehicleId)

    // 


  }
  findAvailableSpot(vehicle: Vehicle): ParkingSpot | null {
    // console.log("inside findAvailableSpot")
    // console.log(vehicle)
    // it means this is throwing null 
    const spot = this.spots.find((spot) => spot.isAvailable() && spot.canPark(vehicle))
    return spot ?? null
  }
  seeSpots(){
    console.log(this.spots)
  }
}

export {
  BikeSpot,
  CarSpot,
  LargeSpot,
  ParkingLot,
  Ticket,
  Vehicle,
};


// lets check of something is missing we can add later

