import { IProduct } from "../../types";

export class Catalog {
  private items: IProduct[] = [];
  private selectedItem: IProduct | null = null;


  // Метод для сохранения товаров
  setItems(items: IProduct[]): void {
    this.items = items;
  }

  // Метод для получения всех товаров (возвращает копию)
  getItems(): IProduct[] {
    return [...this.items];
  }

  // Метод для получения общего количества товаров
  getTotal(): number {
    return this.items.length;
  }

  // Метод для получения товара по id
  getItemById(id: IProduct['id']): IProduct | null {
    return this.items.find(item => item.id === id) ?? null;
  }

  // Метод для выбора товара
  setSelectedItem(item: IProduct | null): void {
    this.selectedItem = item;
  }

  // Метод для выбора товара напрямую по его id
  setSelectedItemById(id: IProduct['id']): void {
    this.selectedItem = this.getItemById(id);
  }

  // Метод для получения выбранного товара
  getSelectedItem(): IProduct | null {
    return this.selectedItem;
  }
}