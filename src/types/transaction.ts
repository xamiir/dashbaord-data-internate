export type Transaction = {
  id: string;
  payinProvider: string;
  payoutProvider: string;
  payoutAccountId: string;
  payinAccountId: string;
  createdBy: string | null;
  userId: string | null;
  chargeId: string | null;
  referenceId: string | null;
  description: string | null;
  payinAmount: string;
  payoutAmount: string;
  payinStatus: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
};

export type TransactionDTO = {
  payinProvider: string;
  payoutProvider: string;
  description: string | null;
  chargeId: string | null;
  referenceId: string | null;
  payoutAccountId: string;
  payinAccountId: string;
  payinAmount: string;
  payoutAmount: string;
  payinStatus: string;
  rate: number;
};
