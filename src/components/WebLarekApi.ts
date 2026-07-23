import { IApi, TOrder, TOrderResponse, TProductListResponse, TResponseError } from "../types";


export class WebLarekApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }
  
  // метод для получения списка товаров
  getProductList(): Promise<TProductListResponse> {
    return this.api.get<TProductListResponse>('/product')
  }
  
  // метод для отправки заказа
  async postOrder(order: TOrder): Promise<TOrderResponse | TResponseError > {
      return await this.api.post<TOrderResponse>('/order', order)
    }
  }