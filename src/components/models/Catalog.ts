import { IProduct } from "../../types";

export class Catalog {
  private items: IProduct[];
  private selectedItem: IProduct | null;

  constructor() {
    this.items = [];
    this.selectedItem = null;
  }
  // метод для сохранения товаров
  setItems(items: IProduct[]): void {
    this.items = items;
  }
  // метод для получения всех товаров
  getItems(): IProduct[] {
    return [...this.items];
  }
  //метод для получения общего количества товаров
  getTotal(): number {
    return this.items.length
  }
  // метод для получения товара по id
  getItemById(id: IProduct['id']): IProduct | null {
    return this.items.find(item => item.id === id) || null;
  }
  // метод для выбора товара
  setSelectedItem(item: IProduct | null): void {
    this.selectedItem = item;
  }
  // метод для получения выбранного товара
  getSelectedItem(): IProduct | null {
    return this.selectedItem;
  }

}