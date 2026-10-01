import { Coin } from "./types";
import { VendingMachine } from "./vendingMachine";

interface VendingMachineState {
  machine: VendingMachine;
  selectItem(item: string): void;
  dispense(): void;
  insertCoin(coin: Coin): void;
  refund(): void;
}

class DispensingState implements VendingMachineState {
  constructor(public machine: VendingMachine) {}
  selectItem(item: string): void {}
  dispense(): void {}
  insertCoin(coin: Coin): void {}
  refund(): void {}
}

class HasMoneyState implements VendingMachineState {
  constructor(public machine: VendingMachine) {}
  selectItem(item: string): void {}
  dispense(): void {}
  insertCoin(coin: Coin): void {}
  refund(): void {}
}

class IdleState implements VendingMachineState {
  constructor(public machine: VendingMachine) {}
  selectItem(item: string): void {}
  dispense(): void {}
  insertCoin(coin: Coin): void {}
  refund(): void {}
}

class ItemSelectedState implements VendingMachineState {
  constructor(public machine: VendingMachine) {}
  selectItem(item: string): void {}
  dispense(): void {}
  insertCoin(coin: Coin): void {}
  refund(): void {}
}

export { DispensingState, HasMoneyState, IdleState, ItemSelectedState };
