import { TEvent } from "@/models/event.mode";

const getTicketPrice = (eventData: TEvent | undefined): number => {
  if (!eventData) return 0;

  const currentDate = new Date();
  const isPromoActive =
    eventData.promotion &&
    eventData.start_promo &&
    eventData.end_promo &&
    currentDate > new Date(eventData.start_promo) &&
    currentDate < new Date(eventData.end_promo);

  return isPromoActive ? eventData.promo_price : eventData.ticket_price;
};

export default getTicketPrice;
