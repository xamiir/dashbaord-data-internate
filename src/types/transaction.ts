export interface ITransaction {
  id: string;
  reference?: string;
  user: string; // ObjectId as string
  senderMobile?: string;
  receiverMobile: string;
  network: string;
  category?: string;
  amount: number;
  bundleLabel?: string;
  ussd?: string;
  txId: string;
  gatewayId?: string;
  simSlot?: number;
  subscriptionId?: number;
  gatewayResponse?: any;
  status: "pending" | "success" | "failed";
  notified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type Transaction = ITransaction;

export type TransactionDTO = {
  reference?: string;
  user: string;
  senderMobile?: string;
  receiverMobile: string;
  network: string;
  category?: string;
  amount: number;
  bundleLabel?: string;
  ussd?: string;
  txId: string;
  gatewayId?: string;
  simSlot?: number;
  subscriptionId?: number;
  gatewayResponse?: any;
  status?: "pending" | "success" | "failed";
  notified?: boolean;
};

export type BuyDataDTO = {
  senderMobile: string;
  receiverMobile: string;
  reference: string;
  selectBundle: {
    _id: string;
  };
};
