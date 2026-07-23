import { IProduct } from "../../types";

export class Cart {

  private items: IProduct[];

  constructor() {
    this.items = [];
  }

  getItems(): IProduct[] {
    return [...this.items];
  }

  addItem(item: IProduct): void {
    if (this.items.find(i => i.id === item.id)) {
      return;
    }
    this.items.push(item);
  }

  removeItem(item: IProduct): void {
    this.items = this.items.filter(i => i.id !== item.id);
  }

  clear(): void {
    this.items = [];
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.price ?? 0), 0)
  }

  getItemsCount(): number {
    return this.items.length;
  }

  checkItem(id: IProduct['id']): boolean {
    return this.items.find(i => i.id === id) !== undefined;
  }

}