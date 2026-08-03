import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export abstract class BaseFormView<T> extends Component<T> {
  protected formElement: HTMLFormElement;
  protected actionButton: HTMLButtonElement;
  protected feedbackField: HTMLElement;

  constructor(container: HTMLFormElement, protected readonly eventBus: IEvents) {
    super(container);
    this.formElement = container;

    this.actionButton = container.querySelector("button[type='submit']") as HTMLButtonElement;
    this.feedbackField = container.querySelector(".form__errors") as HTMLElement;

    if (!this.actionButton || !this.feedbackField) {
      throw new Error(`[Form Error]: Обязательные элементы формы не найдены в контейнере.`);
    }

    this.formElement.addEventListener("submit", (evt: Event) => {
      evt.preventDefault();
      const formIdentifier = this.formElement.getAttribute("name") || "generic-form";
      this.eventBus.emit(`ui:${formIdentifier}-submitted`);
    });
  }

  set valid(isFormValid: boolean) {
    this.actionButton.disabled = !isFormValid;
  }

  set errors(errorMessage: string) {
    this.feedbackField.textContent = errorMessage || "";
  }
}