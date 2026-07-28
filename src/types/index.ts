export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  price: number | null;
  id: string;
  category: string;
  title: string;
  image: string;
  description: string;
}

export const EPayment = {
  online: 'online',
  onReceipt: 'onReceipt',
} as const;

export type EPayment = typeof EPayment[keyof typeof EPayment];
export type TPayment = EPayment | null;

export interface ICustomer {
  payment: TPayment | null; 
  address: string;
  email: string;
  phone: string;
}

export type TCustomerErrors = {
  [K in keyof ICustomer]?: string;
};

export interface TOrder extends ICustomer {
  items: string[];
  total: number;
}

export type TOrderResponse = {
  id: string;
  total: number;
};

export type TProductListResponse = {
  items: IProduct[];
  total: number;
};