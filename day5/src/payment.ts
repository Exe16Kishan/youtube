enum Status {
  "PENDING",
  "SUCCESS",
  "FAILED",
  "REFUNDED",
}

interface PaymentMethod {
  pay(amount: number): void;
  refund(amount: number): void;
}

class PayPalPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`paid ${amount} using paypal`);
  }

  refund(amount: number): void {
    console.log(`refunded ${amount} using paypal`);
  }
}

class UPIPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`paid ${amount} using UPI`);
  }

  refund(amount: number): void {
    console.log(`refunded ${amount} using UPI`);
  }
}

class CardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`paid ${amount} using card`);
  }

  refund(amount: number): void {
    console.log(`refunded ${amount} using card`);
  }
}

class CashPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`paid ${amount} using cash`);
  }

  refund(amount: number): void {
    console.log(`refunded ${amount} using cash`);
  }
}

class Payment {
  private paymentStatus: Status = Status.PENDING;
  private paymentMethod: PaymentMethod;
  constructor(paymentMethod: PaymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  pay(amount: number) {
    this.paymentMethod.pay(amount);
    this.paymentStatus = Status.SUCCESS;
  }
  refund(amount: number) {
    if (this.paymentStatus !== Status.SUCCESS) {
      console.log(" payment cannot be refunded");
      return;
    }

    // if it not successs
    this.paymentMethod.refund(amount);
    this.paymentStatus = Status.REFUNDED;
  }
  getStatus() {
    console.log("status: ", Status[this.paymentStatus]);
  }
}

export { CardPayment, CashPayment, Payment, PayPalPayment, Status, UPIPayment };

