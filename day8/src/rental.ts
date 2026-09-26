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
  private rentalRecords = [];
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  addRental(): void {}
  getRentalRecords() {}
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
  ) {}

  calculateTotal() {}
  getRentalStatus() {}
  cancelRenting() {}
  confirmRenting() {}
}

class RentalCompany {
  vehicles: Map<string, Vehicle> = new Map();
  RentalRecords: Map<string, RentalRecords> = new Map();

  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  addVehicle(vehicle: Vehicle) {}
  removeVehicle(vehicleId: string) {}
  findVehicle(vehicleId: string) {}

  createRental(customer: Customer, vehicleId: string, days: number) {} // ---> it will create rental record
  completeRental(rentalId: string) {} // --> when someone returns the vehicle we have to make the status of rental complete and make the vehicle available
  cancelRental(rentalId: string) {} //  --> if someone dont want to rent and cancel the rental booking
  findRental(rentalId: string) {} //  --> to find the record

  getAvailableVehicle() {} // ---> returns vehicles whose status is true
  getAvailableVehicleByType(type: VehicleType) {}
}

export { Customer, RentalCompany, RentalRecords, Vehicle };
