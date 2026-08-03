import { BaseFormView } from "./Form";
import { IEvents } from "../../base/Events";
import { IViewStateConstraints } from "../../../types/index";


interface IContactState extends IViewStateConstraints {
  email: string;
  phone: string;
}

export class ContactDetailsForm extends BaseFormView<IContactState> {
  protected emailBoxField: HTMLInputElement;
  protected telephoneBoxField: HTMLInputElement;

  constructor(targetContainer: HTMLFormElement, communicationsBus: IEvents) {
    super(targetContainer, communicationsBus);

    const emailInput = this.container.querySelector('.form__input[name=email]');
    const phoneInput = this.container.querySelector('.form__input[name=phone]');

    if (!emailInput || !phoneInput) {
      throw new Error('[ContactDetailsForm]: Поля ввода контактных данных не найдены.');
    }

    this.emailBoxField = emailInput as HTMLInputElement;
    this.telephoneBoxField = phoneInput as HTMLInputElement;

    this.emailBoxField.addEventListener('input', this.onEmailChange.bind(this));
    this.telephoneBoxField.addEventListener('input', this.onPhoneChange.bind(this));
  }

  private onEmailChange(): void {
    this.eventBus.emit("form:email", { value: this.emailBoxField.value });
  }

  private onPhoneChange(): void {
    this.eventBus.emit("form:phone", { value: this.telephoneBoxField.value });
  }

  set email(text: string) {
    this.emailBoxField.value = text;
  }

  set phone(text: string) {
    this.telephoneBoxField.value = text;
  }
}