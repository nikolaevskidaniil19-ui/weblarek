import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
  protected _goodsList: IProduct[] = [];
  protected _currentActiveItem: IProduct | null = null;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

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

  setItems(items: IProduct[]): void {
    this._goodsList = items;
    this.events.emit("catalog:changed");
  }

  setSelectedItem(item: IProduct | null): void {
    this._currentActiveItem = item;
    this.events.emit("product:selected");
  }

  getSelectedItem(): IProduct | null {
    return this._currentActiveItem;
  }
}