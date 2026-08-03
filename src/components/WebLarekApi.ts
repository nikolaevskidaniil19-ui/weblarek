import { INetworkProvider, TServerCatalogPayload, TOrder, TServerOrderReceipt } from "../types/index";

export class WebLarekApi {
  protected readonly restGateway: INetworkProvider;

  constructor(coreNetworkClient: INetworkProvider) {
    this.restGateway = coreNetworkClient;
  }

  public downloadCatalog(): Promise<TServerCatalogPayload> {
    return this.restGateway.get<TServerCatalogPayload>('/product');
  }

  public sendOrderTicket(payload: TOrder): Promise<TServerOrderReceipt> {
    return this.restGateway.post<TServerOrderReceipt>('/order', payload);
  }
}