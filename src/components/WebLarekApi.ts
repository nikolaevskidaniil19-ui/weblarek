import { IApi, TProductListResponse, TOrder, TOrderResponse } from "../types";

export class WebLarekApi {
  protected readonly _networkClient: IApi;

  constructor(api: IApi) {
    this._networkClient = api;
  }

  getProductList(): Promise<TProductListResponse> {
    return this._networkClient.get<TProductListResponse>('/product');
  }

  postOrder(order: TOrder): Promise<TOrderResponse> {
    return this._networkClient.post<TOrderResponse>('/order', order);
  }
}