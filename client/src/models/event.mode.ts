import { TUser } from "./user.model";

export type TEvent = {
  id: string;
  title: string;
  user_id: string;
  city: string;
  location: string;
  address: string;
  start_event: Date;
  end_event: Date;
  description: string;
  terms_conditions: string;
  category: string;
  type: string;
  ticket_available: number;
  ticket_price: number;
  promotion?: string;
  start_promo?: Date;
  end_promo?: Date;
  max_buy: string;
  user: TUser;
};
