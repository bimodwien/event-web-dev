"use strict";

import { Request } from "express";
import prisma from "../lib/prisma";
import { TReview } from "../models/review.model";
import { $Enums, Prisma } from "@prisma/client";

class ReviewService {
  static async getAll() {
    const data = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        rating: true,
        total_rating: true,
        review_text: true,
        user: true,
        event: true,
      },
    });
    return data;
  }

  static async getReviewByEvent(req: Request) {}

  static async create(req: Request) {
    const { rating, review_text, total_rating } = req.body as TReview;
    // const { userId } = req.user?.id;
    const { eventId } = req.params;

    const existingEvent = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) {
      throw new Error("Event is not Found");
    }

    const now = new Date();
    if (now < new Date(existingEvent.end_event)) {
      throw new Error("You can only review after the event has ended");
    }

    const transaction = await prisma.transaction.findFirst({
      where: {
        eventId,
        // userId,
        status: "paid",
      },
    });
    if (!transaction) {
      throw new Error("User did not attend the event");
    }

    const data = {
      //   userId,
      eventId,
      rating,
      review_text,
    };

    // const review = await prisma.review.create({
    //   data,
    // });
    // return review;
  }
}

export default ReviewService;
