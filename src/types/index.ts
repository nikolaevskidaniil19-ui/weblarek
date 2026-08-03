export type HttpPostMethod = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'card' | 'cash';

export interface INetworkProvider {
  get<R extends object>(path: string): Promise<R>;
  post<R extends object>(path: string, payload: object, verb?: HttpPostMethod): Promise<R>;
}

export interface IProduct {
  id: string; 
  title: string; 
  image: string; 
  category: string; 
  price: number | null; 
  description: string; 
}


export interface ICustomer {
  payment: TPayment | "" | null; 
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

export type TServerCatalogPayload = {
  total: number;
  items: IProduct[];
};

export type TServerOrderReceipt = {
  id: string;
  total: number;
};

export interface IBaseLayoutFields {
  title: string;
  price: number | null;
}

export interface IInteractionHandlers {
  onClick: (evt: MouseEvent) => void;
}

export interface IViewStateConstraints {
  errors: string;
  valid: boolean;
}