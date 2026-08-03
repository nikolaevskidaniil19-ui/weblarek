import { Component } from "../../base/Component";

export interface IBaseItemFields {
  title: string;
  price: number | null;
}

export abstract class BaseCatalogItem<T> extends Component<T & IBaseItemFields> {
  protected headerNode: HTMLElement;
  protected costNode: HTMLElement;

  constructor(targetContainer: HTMLElement) {
    super(targetContainer);

    const foundTitle = this.container.querySelector('.card__title');
    const foundPrice = this.container.querySelector('.card__price');

    if (!foundTitle || !foundPrice) {
      throw new Error(`[BaseCatalogItem]: Не удалось обнаружить обязательные элементы разметки карточки.`);
    }

    this.headerNode = foundTitle as HTMLElement;
    this.costNode = foundPrice as HTMLElement;
  }

  set title(text: string) {
    this.headerNode.textContent = text ?? '';
  }

  set price(amount: number | null) {
    if (amount === null || amount === undefined) {
      this.costNode.textContent = "Цена не указана";
    } else {
      this.costNode.textContent = `${amount} синапсов`;
    }
  }
}