import { Status } from "@prisma/client";

export type TTransaction = {
  id: string;
  no_inv: string;
  eventId: string;
  userId: string;
  status: Status;
  paid_at?: Date;
  paid_proof?: string;
  total_ticket: number;
  total_price: number;
  point: boolean;
  voucher: boolean;
};
