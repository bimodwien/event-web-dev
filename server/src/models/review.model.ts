import { Event, User } from "@prisma/client";

export type TReview = {
  id: string;
  rating: number;
  total_rating: number;
  review_text: string;
  user: User;
  event: Event;
};
