interface Notification {
  send(message: string): void;
}

class WhatsAppNotification implements Notification{
  send(message: string): void {
    console.log(`${message} recieved from WhatsAppNotification`)
  }
}

class EmailNotification implements Notification {
  send(message: string): void {
    console.log(`${message} recieved from EmailNotification`);
  }
}

class SmsNotification implements Notification {
  send(message: string): void {
    console.log(`${message} recieved from SmsNotification`);
  }
}
class PushNotification implements Notification {
  send(message: string): void {
    console.log(`${message} recieved from PushNotification`);
  }
}

class User {
  private channels: Notification[];

  constructor(channel: Notification[] = []) {
    this.channels = channel;
  }

  getChannels():Notification[]{
    return this.channels
  }

  addNotificationChannel(channel: Notification): string {
    this.channels.push(channel);
    return "added to the list";
  }

  removeNotificationChannel(channel: Notification) {
    this.channels = this.channels.filter(
      (currentChannel) => currentChannel !== channel,
    );
  }

  notify(message: string) {
    // here we have to loop to every channel in the list
    for (const channel of this.channels) {
      channel.send(message);
    }
  }
}

export {
  Notification,
  EmailNotification,
  PushNotification,
  SmsNotification,
  WhatsAppNotification,
  User,
};
