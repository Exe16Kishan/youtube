// import {
//   EmailNotification,
//   SmsNotification,
//   User,
//   WhatsAppNotification,
// } from "./notification";

import { Custumer, MenuItem, OrderItem, Restaurant } from "./foodOrderingSystem";
import { Book, Library, Member } from "./libraryManagementSystem";
import { Payment, UPIPayment } from "./payment";

// import { CashPayment, Payment, PayPalPayment, UPIPayment } from "./payment";

/**
 *
 * 1. Notification System
 *
 */

// // notifications
// const sms = new SmsNotification();
// const email = new EmailNotification();
// const whatspp = new WhatsAppNotification();

// const user = new User();

// // adding notification to user channel
// user.addNotificationChannel(sms);
// user.addNotificationChannel(email);
// user.addNotificationChannel(whatspp);

// //message
// user.notify("something random ");

// // lets remove on of them
// user.removeNotificationChannel(email);
// user.notify("email is removed");

// console.log(user.getChannels());

/**
 *
 * 2. Payment System
 *
 */

// pay using UPI

// const upi = new UPIPayment()
// const cash = new CashPayment()
// const paypal = new PayPalPayment()

// // first payment
// const payment = new Payment(upi)
// payment.getStatus()
// payment.pay(200)
// payment.getStatus()
// payment.refund(200)
// payment.getStatus()

// // new payment using cash

// const payment2 = new Payment(cash)
// payment2.getStatus()
// payment2.pay(200)
// payment2.getStatus()
// payment2.refund(200)
// payment2.getStatus()

// // new payment 3 using paypal

// const payment3 = new Payment(paypal)
// payment3.getStatus()
// payment3.pay(200)
// payment3.getStatus()
// payment3.refund(200)
// payment3.getStatus()

/**
 *
 * 3. Library Management System
 *
 */

// // lets create a library
// const publicLibrary = new Library();
// publicLibrary.assignLibrarian("kishan");

// // lets add books and members
// const book1 = new Book(1, "unknown", "kishan");
// const book2 = new Book(2, "sonal", "sonal");
// const book3 = new Book(3, "design patter", "someone");

// // lets add these books to Library
// publicLibrary.addBook(book1);
// publicLibrary.addBook(book2);
// publicLibrary.addBook(book3);

// // lets create some members
// const member1 = new Member(1, "kishan");
// const member2 = new Member(2, "aman");
// const member3 = new Member(3, "abhisek");

// // add them to library

// publicLibrary.registerMember(member1);
// publicLibrary.registerMember(member2);
// publicLibrary.registerMember(member3);


// // now lets borrow a book (member1 == kishan)
// member1.borrowBook(book1)
// member1.borrowBook(book2)

// // lets check the status of the book

// console.log(book1.isAvailable())
// console.log(book2.isAvailable())
// console.log(book3.isAvailable())

// member2.borrowBook(book1)
// member2.borrowBook(book3)


// // lets see borrowed books of each members

// member1.getBorrowedBooks()
// member2.getBorrowedBooks()
// member3.getBorrowedBooks()


/**
 * 
 * 4. Food Ordering System
 * 
 */


// we will create resturant

const PunjabiDhaba = new Restaurant("1","PunjabiDhaba")
const BengaliDhaba = new Restaurant("2","BengaliDhaba")

// lets add some item to each dhaba

const tandooriRoti = new MenuItem("1","tandoori roti",10)
const chhole = new MenuItem("2","chhole" , 50)
const paneer = new MenuItem("3","Paneer",100)
const rice = new MenuItem("4","Rice",50)

const fish = new MenuItem("1","Fish",50)
const chhena = new MenuItem("2","Chhena",14)
const curd = new MenuItem("3","Curd",40)

PunjabiDhaba.addMenuItem(tandooriRoti)
PunjabiDhaba.addMenuItem(chhole)
PunjabiDhaba.addMenuItem(paneer)
PunjabiDhaba.addMenuItem(rice)

BengaliDhaba.addMenuItem(fish)
BengaliDhaba.addMenuItem(chhena)
BengaliDhaba.addMenuItem(curd)

// lets create some customer to buyyy food items

const kishan = new Custumer("1","kishan")
const abhisek = new Custumer("2","abhisek")

const kishanOrder = kishan.createOrder()
const chhenaRasgulla = new OrderItem(chhena,5)
const paneerFull = new OrderItem(paneer,1)
kishanOrder.addItem(chhenaRasgulla)
kishanOrder.addItem(paneerFull)

const abhisekorder = abhisek.createOrder()
const sweetCurd = new OrderItem(curd,1)
const friedRice = new OrderItem(rice,1)

abhisekorder.addItem(sweetCurd)
abhisekorder.addItem(friedRice)

// kishan 
kishanOrder.getOrderList()
kishan.viewOrder()
kishanOrder.placeOrder()
kishan.viewOrder() 

console.log(kishanOrder.calculateTotal())

// abhisek
abhisekorder.calculateTotal()

// payment
const UPI = new UPIPayment()
const newPayment = new Payment(UPI)
newPayment.pay(170)


// so this is working as expected 
// clone if you can add new methods and so onnn
// let me check my channel