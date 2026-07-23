export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
export interface IProduct {
    id: string;
    title: string;
    price: number | null;
    description: string;
    image: string;
    category: string;
}

export enum EValidationStep {
    shipping = 0,
    contacts = 1,
}

export enum EPayment {
    online = 'online',
    onReceipt = 'onReceipt',
}

export type TPayment = EPayment | null;

export interface ICustomer {
    payment: TPayment;
    address: string;
    email: string;
    phone: string;
}

export type TCustomerErrors = Partial<Record<keyof ICustomer, string>>;

export type TOrder = ICustomer & {
    items: Array<IProduct['id']>;
    total: number;
}

export type TOrderResponse = {
    id: string;
    total: number;
} 

export type TResponseError = {
    error: string;
}

export type TProductListResponse = {
    total: number;
    items: IProduct[];
}

export type TProductItemResponse = IProduct;