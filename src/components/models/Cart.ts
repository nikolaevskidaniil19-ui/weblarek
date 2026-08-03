import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
  private _storage: Record<string, IProduct>;
  protected events: IEvents;

  constructor(events: IEvents) {
    this._storage = Object.create(null);
    this.events = events;
  }

  getItems(): IProduct[] {
    return Object.values(this._storage);
  }

  addItem(item: IProduct): void {
    if (!this._storage[item.id]) {
      this._storage[item.id] = item;
      this.events.emit("basket:changed");
    }
  }

  removeItem(id: IProduct['id']): void {
    if (id in this._storage) {
      delete this._storage[id];
      this.events.emit("basket:changed");
    }
  }

  clear(): void {
    this._storage = Object.create(null);
    this.events.emit("basket:changed");
  }

  getTotal(): number {
    let totalAmount = 0;
    const allProducts = Object.values(this._storage);

    for (const product of allProducts) {
      totalAmount += product.price || 0;
    }

    return totalAmount;
  }

  getItemsCount(): number {
    return Object.keys(this._storage).length;
  }

  checkItem(id: IProduct['id']): boolean {
    return id in this._storage;
  }
}