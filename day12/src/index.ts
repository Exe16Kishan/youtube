import { Coin } from "./types"
import { VendingMachine } from "./vendingMachine"

console.log("day 12")


// init the machine
const machine = new VendingMachine()

const chips = machine.addItem("CHIPS","lays",20,10)

console.log(machine.inventry)
console.log(machine.currentState)
const selectedItem = machine.selectItem("CHIPS")
// console.log(machine.)
const insertCoin = machine.insertCoin(Coin.DIME)
const insertCoin2 = machine.insertCoin(Coin.QUARTER)

console.log(machine.balance)
machine.dispense()

console.log(machine.currentState)  
