import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IPurchaseCompleteState {
  total: number;
}

export class PurchaseCompleteWidget extends Component<IPurchaseCompleteState> {
  protected summaryDetailsNode: HTMLElement;
  protected finishActionBtn: HTMLButtonElement;
  protected readonly eventsDispatcher: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.eventsDispatcher = events;

    const desc = this.container.querySelector(".order-success__description");
    const btn = this.container.querySelector(".order-success__close");

    if (!desc || !btn) {
      throw new Error("[PurchaseCompleteWidget Error]: Элементы окна успешного заказа не обнаружены.");
    }

    this.summaryDetailsNode = desc as HTMLElement;
    this.finishActionBtn = btn as HTMLButtonElement;

    this.finishActionBtn.addEventListener("click", this.handleFinishClick.bind(this));
  }

  private handleFinishClick(): void {
    this.eventsDispatcher.emit("checkout:success-acknowledged");
  }

  set total(moneyAmount: number) {
    const formattedAmount = new Intl.NumberFormat('ru-RU').format(moneyAmount);
    this.summaryDetailsNode.textContent = `Списано ${formattedAmount} синапсов`;
  }
}