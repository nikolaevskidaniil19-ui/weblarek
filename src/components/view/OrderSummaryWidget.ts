import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IWidgetState {
  items: HTMLElement[];
  totalPrice: number;
}

export class OrderSummaryWidget extends Component<IWidgetState> {
  protected listAnchorNode: HTMLElement;
  protected submitTriggerNode: HTMLButtonElement;
  protected costDisplayNode: HTMLElement;
  protected notifierBus: IEvents;

  constructor(targetContainer: HTMLElement, events: IEvents) {
    super(targetContainer);
    this.notifierBus = events;

    const list = this.container.querySelector('.basket__list');
    const submitBtn = this.container.querySelector('.basket__button');
    const totalLabel = this.container.querySelector('.basket__price');

    if (!list || !submitBtn || !totalLabel) {
      throw new Error('[OrderSummaryWidget]: Элементы контейнера корзины не прошли валидацию.');
    }

    this.listAnchorNode = list as HTMLElement;
    this.submitTriggerNode = submitBtn as HTMLButtonElement;
    this.costDisplayNode = totalLabel as HTMLElement;

    this.submitTriggerNode.disabled = true;
    this.submitTriggerNode.addEventListener('click', this.handleCheckoutSubmit.bind(this));
  }

  private handleCheckoutSubmit(): void {
    this.notifierBus.emit("basket:submit");
  }

  set items(elementsCollection: HTMLElement[]) {
    this.listAnchorNode.innerHTML = "";
    if (elementsCollection.length > 0) {
      this.listAnchorNode.append(...elementsCollection);
    }
  }

  set totalPrice(calculatedCost: number) {
    const formatted = new Intl.NumberFormat('ru-RU').format(calculatedCost);
    this.costDisplayNode.textContent = `${formatted} синапсов`;
  }

  set buttonStatus(isDisabled: boolean) {
    this.submitTriggerNode.disabled = isDisabled;
  }
}