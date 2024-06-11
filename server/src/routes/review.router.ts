"use strict";

import { Router } from "express";
import ReviewController from "../controllers/review.controller";

const routerReview = Router();

routerReview.get("/", ReviewController.getAllReview);
routerReview.get("/:eventId", ReviewController.getReviewByEvent);
routerReview.post("/:eventId", ReviewController.createReview);

export default routerReview;
