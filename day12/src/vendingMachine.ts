import { Inventry } from "./inventry";
import { Item } from "./item";
import { Coin } from "./types";
import { DispensingState, HasMoneyState, IdleState, ItemSelectedState, VendingMachineState } from "./vendingMachineState";

export class VendingMachine {
  idleState: VendingMachineState = new IdleState(this);

  public currentState: VendingMachineState;
  public inventry: Inventry;
  public balance: number;
  public selectedItemCode: string | null;

  constructor() {
    this.inventry = new Inventry();
    this.balance = 0;
    this.selectedItemCode = null;
    this.currentState = this.idleState;
  }

  insertCoin(coin: Coin) {
    this.currentState = new HasMoneyState(this)
    this.currentState.insertCoin(coin);
  }

  reset() {
    this.currentState = this.idleState;
  }

  getSelectedItem(): Item {
    if (!this.selectedItemCode) {
      throw new Error("no item is selected");
    }

    const item = this.inventry.getItem(this.selectedItemCode);
    return item;
  }

  addItem(code: string, name: string, price: number, quantity: number): Item {
    const newItem = new Item(price, code, name);
    this.inventry.addItem(code, newItem, quantity);
    return newItem;
  }

  selectItem(code: string): void {
    this.currentState = new ItemSelectedState(this) // so when someone select item the state will b itemselectedState
    this.currentState.selectItem(code);
  }

  dispenseItem() {
    // first we we will select item

    if (!this.selectedItemCode) {
      console.log("item is not selected");
      return;
    }
    // we will get the item
    const item = this.inventry.getItem(this.selectedItemCode);
    if (!item) {
      console.log("item not found");
      return;
    }
    // check the balance > than the selected item

    if (item.price > this.balance) {
      console.log("insufficient balance , please add more amount");
      return;
    }

    // reduce the stock of the item in the inventory
    this.inventry.reduceStock(this.selectedItemCode);
    this.balance -= item.price;

    if (this.balance > 0) {
      // we should refund the balance money
      console.log(`collect the remaining balance ${this.balance}`)
      this.refundBalance();
    }
    // change the state to idle
    console.log("collect the item")
    this.reset();
  }

  dispense() {
    this.currentState = new DispensingState(this)
    this.currentState.dispense();
  }

  refundBalance() {
    // we should refund the user's full balance
    console.log("money is refunded: ", this.balance);
    this.balance = 0;
  }

  addBalance(amount: number) {
    this.balance += amount;
  }

  setSelectedItemCode(code: string) {
    this.selectedItemCode = code;
  }
}
