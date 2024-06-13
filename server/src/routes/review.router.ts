"use strict";

import { Router } from "express";
import ReviewController from "../controllers/review.controller";
import {
  validateToken,
  validateRefreshToken,
} from "../middlewares/auth.middleware";
import {
  verifyCustomer,
  verifyEventOrganizer,
} from "../middlewares/role.middleware";

const routerReview = Router();

routerReview.get("/", ReviewController.getAllReview);
routerReview.get(
  "/:eventId",
  validateToken,
  verifyEventOrganizer,
  ReviewController.getReviewByUser
);
// routerReview.get("/:eventId", validateToken, ReviewController.getReviewByEvent);
routerReview.post(
  "/:eventId",
  validateToken,
  verifyCustomer,
  ReviewController.createReview
);

export default routerReview;
