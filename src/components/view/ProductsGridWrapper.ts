import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IGridWrapperLayout {
  catalog: HTMLElement[];
}

export class ProductsGridWrapper extends Component<IGridWrapperLayout> {
  protected gridLayoutContainer: HTMLElement;

  constructor(container: HTMLElement, protected readonly globalBus: IEvents) {
    super(container);
    this.gridLayoutContainer = container;
  }

  set catalog(domElements: HTMLElement[]) {
    this.gridLayoutContainer.innerHTML = "";
    domElements.forEach((element) => {
      this.gridLayoutContainer.appendChild(element);
    });
  }
}