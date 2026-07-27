import { IProduct } from "../../types";

export class Cart {
  private _storage: Record<string, IProduct>;

  constructor() {
    this._storage = Object.create(null);
  }

  getItems(): IProduct[] {
    return Object.values(this._storage);
  }

  addItem(item: IProduct): void {
    if (!this._storage[item.id]) {
      this._storage[item.id] = item;
    }
  }

  removeItem(id: IProduct['id']): void {
    if (id in this._storage) {
      delete this._storage[id];
    }
  }

  clear(): void {
    this._storage = Object.create(null);
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