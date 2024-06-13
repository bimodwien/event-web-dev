import { TUser } from "./user.model";
import { TEvent } from "./event.mode";

export type TTransaction = {
  id: string;
  status: string;
  paid_at: Date;
  total_ticket: number;
  total_price: number;
  user: TUser;
  event: TEvent;
};
