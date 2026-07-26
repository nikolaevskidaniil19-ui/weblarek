import { IProduct } from "../../types";

export class Cart {
  private items: IProduct[] = []; 
  constructor() {
    this.items = [];
  }

  getItems(): IProduct[] {
    return [...this.items];
  }

  addItem(item: IProduct): void {
    if (this.checkItem(item.id)) {
      return;
    }
    this.items.push(item);
  }

  
  removeItem(id: IProduct['id']): void {
    this.items = this.items.filter(i => i.id !== id);
  }

  clear(): void {
    this.items = [];
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.price ?? 0), 0);
  }

  getItemsCount(): number {
    return this.items.length;
  }

  
  checkItem(id: IProduct['id']): boolean {
    return this.items.some(i => i.id === id);
  }
}