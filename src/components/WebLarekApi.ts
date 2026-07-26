import { IApi,  TProductListResponse } from "../types";


export class WebLarekApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }
  
  getProductList(): Promise<TProductListResponse> {
    return this.api.get<TProductListResponse>('/product')
  }
}