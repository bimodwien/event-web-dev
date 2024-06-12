"use strict";

import { Request } from "express";
import prisma from "../lib/prisma";
import { TReview } from "../models/review.model";
import { Prisma } from "@prisma/client";

class ReviewService {
  static async getAll() {
    const data = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        rating: true,
        review_text: true,
        user: true,
        event: true,
      },
    });
    return data;
  }

  static async getReviewByEvent(req: Request) {
    const { eventId } = req.params;

    const existingEvent = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) {
      throw new Error("Event not found");
    }

    const reviews = await prisma.review.findMany({
      where: {
        id: eventId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    return reviews;
  }

  static async create(req: Request) {
    const { rating, review_text } = req.body as TReview;
    const userId = req.user?.id;
    const { eventId } = req.params;

    const existingEvent = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) {
      throw new Error("Event is not Found");
    }

    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const now = new Date();
    if (now < new Date(existingEvent.end_event)) {
      throw new Error("You can only review after the event has ended");
    }

    const transaction = await prisma.transaction.findFirst({
      where: {
        eventId,
        userId,
        status: "paid",
      },
    });
    if (!transaction) {
      throw new Error("User did not attend this event");
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        eventId,
      },
    });

    if (existingReview) {
      throw new Error("User already reviewed this event");
    }

    const data: Prisma.ReviewCreateInput = {
      user: {
        connect: {
          id: userId,
        },
      },
      event: {
        connect: {
          id: eventId,
        },
      },
      rating,
      review_text,
    };

    const review = await prisma.review.create({
      data,
    });
    return review;
  }
}

export default ReviewService;
