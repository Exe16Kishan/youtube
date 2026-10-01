import { Item } from "./item";

export class Inventry {
  private stockMap: Map<string, number> = new Map();
  private itemMap: Map<string, Item> = new Map();
  constructor() {}

  addItem(code: string, item: Item, stock: number): void {
    this.itemMap.set(code, item);
    const currentStock = this.stockMap.get(code) ?? 0;
    this.stockMap.set(code, currentStock + stock);
  }
  reduceStock(code: string) {
    const currentStock = this.stockMap.get(code) ?? 0;
    if (currentStock <= 0) {
      return;
    }
    this.stockMap.set(code, currentStock - 1);
  }
  getItem(code: string): Item {
    const item = this.itemMap.get(code);
    if (!item) {
      throw new Error("item not found");
    }
    return item;
  }
  isAvailable(code: string): boolean {
    return (this.stockMap.get(code) ?? 0) > 0;
  }
}
