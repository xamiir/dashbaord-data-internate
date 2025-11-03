export interface ISim {
  slotIndex: number;
  carrierName: string;
  subscriptionId: number;
}

export interface IDevice {
  manufacturer: string;
  model: string;
  android: number;
}

export interface IGateway {
  gatewayId: string;
  status: string;
  sims: ISim[];
  device: IDevice;
  lastSeen: string | number;
}

export interface IGatewayResponse {
  total: number;
  active: number;
  gateways: IGateway[];
}

export type Gateway = IGateway;
export type GatewayResponse = IGatewayResponse;
