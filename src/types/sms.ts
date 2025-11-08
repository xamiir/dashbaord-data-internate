export interface ISMS {
  _id: string;
  from: string;
  body: string;
  timestamp: number;
  createdAt: string;
}

export type SMS = ISMS;

export type SMSDTO = {
  from: string;
  body: string;
  timestamp: number;
};
