import { CategoryName, City, MaxBuy, PromoList, Type } from "@prisma/client";

export type TEvent = {
  title: string;
  user_id: string;
  city: City;
  location: string;
  address: string;
  start_event: Date;
  end_event: Date;
  description: string;
  terms_conditions: string;
  category: CategoryName;
  type: Type;
  ticket_available: number;
  ticket_price: number;
  promotion?: PromoList;
  start_promo?: Date;
  end_promo?: Date;
  max_buy: MaxBuy;
};
