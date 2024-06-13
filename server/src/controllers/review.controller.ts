"use strict";

import { NextFunction, Request, Response } from "express";
import ReviewService from "../services/review.service";

class ReviewController {
  static async getAllReview(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ReviewService.getAll();
      res.status(200).send({
        response,
        message: "Get all review Success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getReviewByEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await ReviewService.getReviewByEvent(req);
      res.status(200).send({
        response,
        message: "Get all review by Finished Event",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getReviewByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("masuk ke controller");

      const response = await ReviewService.getReviewByUser(req);
      res.status(200).send({
        message: "fetch by user",
        response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createReview(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ReviewService.create(req);
      res.status(200).send({
        response,
        message: "Create Review Success",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ReviewController;
