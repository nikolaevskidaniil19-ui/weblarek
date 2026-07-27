import { IProduct } from "../../types";

export class Catalog {
  protected _goodsList: IProduct[] = [];
  protected _currentActiveItem: IProduct | null = null;

  getItems(): IProduct[] {
    return Array.from(this._goodsList);
  }

  getTotal(): number {
    return this._goodsList.length;
  }

  getItemById(id: IProduct['id']): IProduct | null {
    for (const item of this._goodsList) {
      if (item.id === id) {
        return item;
      }
    }
    return null;
  }

  setSelectedItemById(id: IProduct['id']): void {
    const found = this.getItemById(id);
    this._currentActiveItem = found;
  }

  setItems(items: IProduct[]): void {
    this._goodsList = items;
  }

  setSelectedItem(item: IProduct | null): void {
    this._currentActiveItem = item;
  }

  getSelectedItem(): IProduct | null {
    return this._currentActiveItem;
  }
}