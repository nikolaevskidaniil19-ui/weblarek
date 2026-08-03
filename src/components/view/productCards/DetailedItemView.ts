import { BaseCatalogItem } from "./BaseCatalogItem";
import { IMAGE_CDN_PATH } from "../../../utils/constants";

interface IDetailedViewProps {
  category: string;
  description: string;
  image: string;
  buttonText: string;
  buttonDisabled: boolean;
}

export class DetailedItemView extends BaseCatalogItem<IDetailedViewProps> {
  protected categoryTagNode: HTMLElement;
  protected bodyTextNode: HTMLElement;
  protected actionButtonNode: HTMLButtonElement;
  protected visualNode: HTMLImageElement;

  constructor(targetContainer: HTMLElement, eventCallbacks: { onClick: (evt: MouseEvent) => void }) {
    super(targetContainer);

    const cat = this.container.querySelector('.card__category');
    const desc = this.container.querySelector('.card__text');
    const btn = this.container.querySelector('.card__button');
    const image = this.container.querySelector('.card__image');

    if (!cat || !desc || !btn || !image) {
      throw new Error('[DetailedItemView]: Элементы модального окна карточки не найдены.');
    }

    this.categoryTagNode = cat as HTMLElement;
    this.bodyTextNode = desc as HTMLElement;
    this.actionButtonNode = btn as HTMLButtonElement;
    this.visualNode = image as HTMLImageElement;

    if (eventCallbacks?.onClick) {
      this.actionButtonNode.addEventListener('click', eventCallbacks.onClick);
    }
  }

  set description(text: string) {
    this.bodyTextNode.textContent = text;
  }

  set category(name: string) {
    if (this.categoryTagNode) {
      this.categoryTagNode.textContent = name;
    }
  }

  set image(sourceUrl: string) {
    this.setImage(this.visualNode, IMAGE_CDN_PATH + sourceUrl);
  }

  set buttonText(caption: string) {
    this.actionButtonNode.textContent = caption;
  }

  set buttonDisabled(status: boolean) {
    this.actionButtonNode.disabled = status;
  }
}