import { BaseFormView } from "./Form";
import { IEvents } from "../../base/Events";
import { TPayment, IViewStateConstraints } from "../../../types/index"; 

interface IBillingState extends IViewStateConstraints {
  payment: TPayment | "" | null; 
  address: string;
}

export class BillingDetailsForm extends BaseFormView<IBillingState> {
  protected transactionCardBtn: HTMLButtonElement;
  protected cashOnDeliveryBtn: HTMLButtonElement;
  protected locationInputField: HTMLInputElement;

  constructor(targetContainer: HTMLFormElement, eventBus: IEvents) {
    super(targetContainer, eventBus);

    const card = this.container.querySelector('button[name=card]');
    const cash = this.container.querySelector('button[name=cash]');
    const addr = this.container.querySelector('.form__input');

    if (!card || !cash || !addr) {
      throw new Error('[BillingDetailsForm]: Поля ввода формы заказа отсутствуют в DOM.');
    }

    this.transactionCardBtn = card as HTMLButtonElement;
    this.cashOnDeliveryBtn = cash as HTMLButtonElement;
    this.locationInputField = addr as HTMLInputElement;

    this.transactionCardBtn.addEventListener('click', this.dispatchCardSelect.bind(this));
    this.cashOnDeliveryBtn.addEventListener('click', this.dispatchCashSelect.bind(this));
    this.locationInputField.addEventListener('input', this.handleAddressInput.bind(this));
  }

  private dispatchCardSelect(): void {
    this.eventBus.emit("payment:card");
  }

  private dispatchCashSelect(): void {
    this.eventBus.emit("payment:cash");
  }

  private handleAddressInput(): void {
    this.eventBus.emit("form:address", { value: this.locationInputField.value });
  }

  set payment(selectedMethod: TPayment | "" | null) {
    const activeClass = "button_alt-active";
    this.transactionCardBtn.classList.toggle(activeClass, selectedMethod === "card");
    this.cashOnDeliveryBtn.classList.toggle(activeClass, selectedMethod === "cash");
  }

  set address(textString: string) {
    this.locationInputField.value = textString;
  }
}