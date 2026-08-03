import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModalPopupState {
  content: HTMLElement;
}

export class OverlayModalPopup extends Component<IModalPopupState> {
  protected dismissBtnNode: HTMLButtonElement;
  protected bodyContentHolder: HTMLElement;
  protected readonly localEventBus: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.localEventBus = events;

    const crossBtn = this.container.querySelector(".modal__close");
    const innerBox = this.container.querySelector(".modal__container");

    if (!crossBtn || !innerBox) {
      throw new Error("[OverlayModalPopup Error]: Структурные элементы всплывающего окна не обнаружены.");
    }

    this.dismissBtnNode = crossBtn as HTMLButtonElement;
    this.bodyContentHolder = innerBox as HTMLElement;

    this.container.addEventListener("click", this.handlePopupInteractions.bind(this));
  }

  private handlePopupInteractions(evt: MouseEvent): void {
    const clickedTarget = evt.target as HTMLElement;

    if (
      clickedTarget === this.container || 
      clickedTarget === this.dismissBtnNode || 
      this.dismissBtnNode.contains(clickedTarget)
    ) {
      this.dismiss();
    }
  }

  set content(domNode: HTMLElement) {
    this.bodyContentHolder.innerHTML = "";
    if (domNode) {
      this.bodyContentHolder.appendChild(domNode);
    }
  }

  public display(): void {
    this.container.classList.add("modal_active");
  }

  public dismiss(): void {
    this.container.classList.remove("modal_active");
    this.localEventBus.emit("overlay:popup-dismissed");
  }
}