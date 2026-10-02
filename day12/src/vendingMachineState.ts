import { Coin } from "./types";
import { VendingMachine } from "./vendingMachine";

interface VendingMachineState {
  machine: VendingMachine;
  selectItem(code: string): void;
  dispense(): void;
  insertCoin(coin: Coin): void;
  refund(): void;
}

class DispensingState implements VendingMachineState {
  constructor(public machine: VendingMachine) {}
  selectItem(code: string): void {}
  dispense(): void {
    this.machine.dispenseItem()
  }
  insertCoin(coin: Coin): void {}
  refund(): void {}
}

class HasMoneyState implements VendingMachineState {
  constructor(public machine: VendingMachine) {}
  selectItem(code: string): void {}
  dispense(): void {}
  insertCoin(coin: Coin): void {
    console.log(coin)
    this.machine.addBalance(coin)
  }
  refund(): void {}
}

class IdleState implements VendingMachineState {
  constructor(public machine: VendingMachine) {}
  selectItem(code: string): void {}
  dispense(): void {}
  insertCoin(coin: Coin): void {}
  refund(): void {}
}

class ItemSelectedState implements VendingMachineState {
  constructor(public machine: VendingMachine) {}
  selectItem(code: string): void {
    this.machine.selectedItemCode = this.machine.inventry.getItem(code).code
  }
  dispense(): void {}
  insertCoin(coin: Coin): void {}
  refund(): void {}
}

export { DispensingState, HasMoneyState, IdleState, ItemSelectedState , VendingMachineState};
