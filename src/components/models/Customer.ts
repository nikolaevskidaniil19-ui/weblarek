import { ICustomer, TCustomerErrors, EPayment } from "../../types";

export class Customer {
  private payment: EPayment | null = null; 
  private address: string = '';
  private email: string = '';
  private phone: string = '';

  constructor() {
    this.payment = null;
    this.address = '';
    this.email = '';
    this.phone = '';
  }

  set(data: Partial<ICustomer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.address !== undefined) this.address = data.address;
    if (data.email !== undefined) this.email = data.email;
    if (data.phone !== undefined) this.phone = data.phone;
  }

   get(): ICustomer {
    return {
      payment: this.payment as EPayment, 
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  clear(): void {
    this.payment = null;
    this.address = '';
    this.email = '';
    this.phone = '';
  }

  validate(): TCustomerErrors {
    const errors: TCustomerErrors = {};

    if (!this.payment) {
      errors.payment = 'Не выбран вид оплаты';
    }
    if (!this.address) {
      errors.address = 'Не введен адрес';
    }
    if (!this.email) {
      errors.email = 'Укажите корректный email';
    }
    if (!this.phone) {
      errors.phone = 'Укажите корректный телефон';
    }
    
    return errors;
  }
}