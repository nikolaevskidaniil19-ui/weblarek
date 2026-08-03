import { ICustomer, TCustomerErrors } from "../../types";
import { IEvents } from "../base/Events";

export class Customer {
  private _profile: ICustomer = {
    payment: null, 
    address: '',
    email: '',
    phone: '',
  };
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  set(data: Partial<ICustomer>): void {
    this._profile = Object.assign({}, this._profile, data);
    this.events.emit("buyer:changed");
  }

  get(): ICustomer {
    return { ...this._profile };
  }

  clear(): void {
    this._profile = {
      payment: null, 
      address: '',
      email: '',
      phone: '',
    };
    this.events.emit("buyer:changed");
  }

  validate(): TCustomerErrors {
    const errorMap: TCustomerErrors = {};
    const state = this._profile;

    if (!state.payment) errorMap.payment = 'Не выбран вид оплаты';
    if (!state.address?.trim()) errorMap.address = 'Не введен адрес';
    if (!state.email?.trim()) errorMap.email = 'Укажите корректный email';
    if (!state.phone?.trim()) errorMap.phone = 'Укажите корректный телефон';

    return errorMap;
  }
}