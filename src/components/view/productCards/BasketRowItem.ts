import { BaseCatalogItem } from "./BaseCatalogItem";

interface IBasketRowProps {
  index: number;
}

export class BasketRowItem extends BaseCatalogItem<IBasketRowProps> {
  protected numericIndexNode: HTMLElement;
  protected deleteControlNode: HTMLButtonElement;

  constructor(targetContainer: HTMLElement, actionCallbacks?: { onClick: () => void }) {
    super(targetContainer);

    const idx = this.container.querySelector('.basket__item-index');
    const delBtn = this.container.querySelector('.basket__item-delete');

    if (!idx || !delBtn) {
      throw new Error('[BasketRowItem]: Элементы разметки элемента корзины не обнаружены.');
    }

    this.numericIndexNode = idx as HTMLElement;
    this.deleteControlNode = delBtn as HTMLButtonElement;

    if (actionCallbacks && typeof actionCallbacks.onClick === 'function') {
      this.deleteControlNode.addEventListener('click', actionCallbacks.onClick);
    }
  }

  set index(position: number) {
    this.numericIndexNode.textContent = String(position);
  }
}