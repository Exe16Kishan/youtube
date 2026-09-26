import { Customer, RentalCompany, Vehicle } from "./rental";

console.log("Day 8");

// lets start with the testing

// first we will create a company

const rentalCompany = new RentalCompany("r-1", "adarsh rentals");

// lets create and some vehiclesss

const swift = new Vehicle("v-1", "swift", "Car", 2000);
const creta = new Vehicle("v-2", "creta", "Car", 3000);
const honda = new Vehicle("v-3", "honda", "Bike", 800);

rentalCompany.addVehicle(swift);
rentalCompany.addVehicle(creta);
rentalCompany.addVehicle(honda);

// lets see vehicles
rentalCompany.getAvailableVehicleByType("Car");

// lets create some customer

const aman = new Customer("c-1", "aman");
const mohit = new Customer("c-2", "mohit");

// they are renting

// todo - to make total of all the records
const amanRenting = rentalCompany.createRental(aman, "v-1", 3);
rentalCompany.createRental(aman, "v-2", 3);
const mohitRenting = rentalCompany.createRental(mohit, "v-3", 8);

aman.getRentalRecords();

// rentalCompany.completeRental("v-2-aman");

// rentalCompany.cancelRental("v-1-aman");
rentalCompany.getAvailableVehicle();

console.log(aman.getTotal()) // 15000 rs 

// so thats it for the day 

// byeeee