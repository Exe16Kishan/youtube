// import {
//   EmailNotification,
//   SmsNotification,
//   User,
//   WhatsAppNotification,
// } from "./notification";

import { CashPayment, Payment, PayPalPayment, UPIPayment } from "./payment";

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
 * PAYMENT SYSTEM
 * 
 */


// pay using UPI

const upi = new UPIPayment()
const cash = new CashPayment()
const paypal = new PayPalPayment()

// first payment
const payment = new Payment(upi)
payment.getStatus()
payment.pay(200)
payment.getStatus()
payment.refund(200)
payment.getStatus()


// new payment using cash 

const payment2 = new Payment(cash)
payment2.getStatus()
payment2.pay(200)
payment2.getStatus()
payment2.refund(200)
payment2.getStatus()


// new payment 3 using paypal

const payment3 = new Payment(paypal)
payment3.getStatus()
payment3.pay(200)
payment3.getStatus()
payment3.refund(200)
payment3.getStatus()