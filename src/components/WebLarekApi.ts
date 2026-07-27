import { IApi, TProductListResponse } from "../types";

export class WebLarekApi {
  protected readonly _networkClient: IApi;

  constructor(api: IApi) {
    this._networkClient = api;
  }
  async getProductList(): Promise<TProductListResponse> {
    const response = await this._networkClient.get<TProductListResponse>('/product');
    return response;
  }
}