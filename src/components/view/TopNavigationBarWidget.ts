import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface INavigationBarState {
  counter: number;
}

export class TopNavigationBarWidget extends Component<INavigationBarState> {
  protected triggerBasketBtn: HTMLButtonElement;
  protected badgeCounterNode: HTMLElement;
  protected readonly appEventBus: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.appEventBus = events;

    const basketBtn = this.container.querySelector(".header__basket");
    const counterBadge = this.container.querySelector(".header__basket-counter");

    if (!basketBtn || !counterBadge) {
      throw new Error("[TopNavigationBarWidget Error]: Элементы управления шапки сайта не найдены в DOM-дереве.");
    }

    this.triggerBasketBtn = basketBtn as HTMLButtonElement;
    this.badgeCounterNode = counterBadge as HTMLElement;

    this.triggerBasketBtn.addEventListener("click", this.notifyBasketOpening.bind(this));
  }

  private notifyBasketOpening(): void {
    this.appEventBus.emit("ui:open-basket-requested");
  }

  set counter(numericValue: number) {
    this.badgeCounterNode.textContent = `${numericValue}`;
  }
}