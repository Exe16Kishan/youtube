import {
  EmailNotification,
  SmsNotification,
  User,
  WhatsAppNotification,
} from "./notification";

// notifications
const sms = new SmsNotification();
const email = new EmailNotification();
const whatspp = new WhatsAppNotification();

const user = new User();

// adding notification to user channel
user.addNotificationChannel(sms);
user.addNotificationChannel(email);
user.addNotificationChannel(whatspp);

//message
user.notify("something random ");

// lets remove on of them
user.removeNotificationChannel(email);
user.notify("email is removed");

console.log(user.getChannels());
