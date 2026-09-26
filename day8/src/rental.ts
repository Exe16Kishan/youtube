// classes we have - vehicle , customer , rental company , vehicle type - car , bike and so onnn

/**
 * vehicle {
 * id
 * name
 * type   // car and bike
 * price/day
 * available ?? either true or false
 *
 * isAvailable():boolean
 * makeAvailable():void
 * rent() --> available --> false
 *
 * }
 *
 * customer {
 * custmer HAS-A rentalRecords = []
 * id
 * name
 * addRental(rentalRecord) // to add rental records
 * getRentalRecord() ---> rentalRecord[]
 * }
 *
 *
 * rentalCompany{
 * rental company HAS-A vehicle map <string , vehicle>
 * rental company HAS-A customer map <string , customer>
 *
 * addVehicle(vehicle)
 * removeVehicle(vehicleId)
 * findVehicle(vehicleId)
 *
 * createRental(customer , vehicleId , days) ---> it will create rental record
 * completeRental(rentalId) --> when someone returns the vehicle we have to make the status of rental complete and make the vehicle available
 * cancelRental(rentalId) --> if someone dont want to rent and cancel the rental booking
 * findRental(rentalId) --> to find the record
 *
 * getAvailableVehicle() ---> returns vehicles whose status is true
 * getAvailableVehicleByType(type) ---> returns vehicle whose type matches
 * }
 *
 *
 * we will also need a rental record
 * rentalRecord {
 * id
 * customer // relationship ---> rentalRecord HAS-A customer
 * vehicle // relationship ---> rentalRecord HAS-A vehicle
 * days - like for how many days
 * total price
 * status  "active" | "completed" | "cancelled" | "inActive"
 *
 * Cancel() ---> status inactive
 * confirm() --> status active
 * calculateTotal() --> days x perDayPrice of the vehicle
 * getStatus() ---> to get current
 * }
 *
 */

type VehicleType = "Bike" | "Car"; // later we can add more vehicle type

class Vehicle {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: VehicleType,
    public readonly pricePerDay: number,
    public available: boolean = true, // by default vehicle is available
  ) {}

  isAvailable(): boolean {
    return this.available === true;
  }

  makeAvailable(): void {
    this.available = true;
  }

  rent(): void {
    this.available = false;
  }
}

class Customer {
  private rentalRecords: RentalRecords[] = [];
    totalBill : number = 0
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  getTotal(){
    this.totalBill = this.rentalRecords.reduce((total , rental)=>{
            total += rental.calculateTotal()
            return total

    },0)
    return this.totalBill
  }

  addRental(newRentalRecord: RentalRecords): void {
    this.rentalRecords.push(newRentalRecord);
  }
  getRentalRecords() {
    console.log(this.rentalRecords);
  }
}

type RentalStatus = "Active" | "Completed" | "Cancelled";
class RentalRecords {
  constructor(
    public readonly id: string,
    public customer: Customer,
    public vehicle: Vehicle,
    public days: number,
    public totalPrice: number = 0,
    public rentalStatus: RentalStatus = "Active",
  ) {
    this.totalPrice = days * vehicle.pricePerDay
  }

  calculateTotal() {
   return this.totalPrice = this.days * this.vehicle.pricePerDay;
  }
  getRentalStatus() {
    return this.rentalStatus;
  }
  cancelRenting() {
    this.rentalStatus = "Cancelled";
    this.vehicle.makeAvailable();
  }
  confirmRenting() {
    this.rentalStatus = "Completed";
    this.vehicle.makeAvailable();
  }
}

class RentalCompany {
  vehicles: Map<string, Vehicle> = new Map();
  RentalRecords: Map<string, RentalRecords> = new Map();

  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  addVehicle(vehicle: Vehicle) {
    this.vehicles.set(vehicle.id, vehicle);
  }
  removeVehicle(vehicleId: string) {
    this.vehicles.delete(vehicleId);
  }
  findVehicle(vehicleId: string) {
    console.log(this.vehicles.get(vehicleId));
  }

  createRental(customer: Customer, vehicleId: string, days: number) {
    // first we gonna get the vehicle details like is it available or not
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) {
      console.log("Vehicle not found"); // or you can through error
      return;
    }

    if (!vehicle.isAvailable()) {
      console.log(` currently ${vehicle.name} is unavailable`);
      return;
    }

    // days must be more than 0
    if (days < 1) {
      console.log(" vehicle is not available for this period");
      return;
    }

    vehicle.rent(); // it will create status of the vehicle unavailable
    const newRentalRecord = new RentalRecords(
      `${vehicle.id}-${customer.name}`,
      customer,
      vehicle,
      days,
    );
    // newRentalRecord.calculateTotal() we can do this or we can just init the value in the constructor

    this.RentalRecords.set(newRentalRecord.id, newRentalRecord);
    customer.addRental(newRentalRecord); // we also have to show it to the customer side

    console.log("booking completed : ", newRentalRecord);
  } // ---> it will create rental record
  completeRental(rentalId: string) {
    const rentalRecord = this.RentalRecords.get(rentalId);
    if (!rentalRecord) {
      console.log(`no record found with this ${rentalId} id`);
      return;
    }
    rentalRecord.confirmRenting();
  } // --> when someone returns the vehicle we have to make the status of rental complete and make the vehicle available
  cancelRental(rentalId: string) {
    const rentalRecord = this.RentalRecords.get(rentalId);
    if (!rentalRecord) {
      console.log(`no record found with this ${rentalId} id`);
      return;
    }
    rentalRecord.cancelRenting();
  } //  --> if someone dont want to rent and cancel the rental booking
  findRental(rentalId: string) {
    const rentalRecord = this.RentalRecords.get(rentalId);
    console.log(rentalRecord);
  } //  --> to find the record

  getAvailableVehicle() {
    const availableVehicles = [...this.vehicles.values()].filter((vehicle) =>
      vehicle.isAvailable(),
    );
    console.log(availableVehicles);
  } // ---> returns vehicles whose status is true
  getAvailableVehicleByType(type: VehicleType) {
    const availableVehiclesByType = [...this.vehicles.values()].filter(
      (vehicle) => vehicle.type === type,
    );
    console.log(`available ${type} found :`, availableVehiclesByType);
  }
}

export { Customer, RentalCompany, RentalRecords, Vehicle };
