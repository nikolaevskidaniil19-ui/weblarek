import { BaseCatalogItem } from "./BaseCatalogItem";
import { IMAGE_CDN_PATH, UI_CATEGORY_STYLE_REGISTRY } from "../../../utils/constants";

function applyCategoryStyle(element: HTMLElement, categoryName: string): void {
  if (!element) return;
  Object.values(UI_CATEGORY_STYLE_REGISTRY).forEach(cls => element.classList.remove(cls));
  
  const targetClass = UI_CATEGORY_STYLE_REGISTRY[categoryName];
  if (targetClass) {
    element.classList.add(targetClass);
  }
  element.textContent = categoryName;
}

interface ICatalogItemProps {
  category: string;
  image: string;
}

export class CatalogGridCard extends BaseCatalogItem<ICatalogItemProps> {
  protected badgeNode: HTMLElement;
  protected previewImageNode: HTMLImageElement;

  constructor(targetContainer: HTMLElement, clickHandler?: { onClick: () => void }) {
    super(targetContainer);

    const badge = this.container.querySelector('.card__category');
    const img = this.container.querySelector('.card__image');

    if (!badge || !img) {
      throw new Error('[CatalogGridCard]: Критические элементы внутренней разметки отсутствуют.');
    }

    this.badgeNode = badge as HTMLElement;
    this.previewImageNode = img as HTMLImageElement;

    if (clickHandler && typeof clickHandler.onClick === 'function') {
      this.container.addEventListener('click', clickHandler.onClick);
    }
  }

  set category(categoryName: string) {
    applyCategoryStyle(this.badgeNode, categoryName);
  }

  set image(path: string) {
    this.setImage(this.previewImageNode, IMAGE_CDN_PATH + path);
  }
}