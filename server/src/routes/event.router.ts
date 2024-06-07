import { Router } from "express";
import eventController from "../controllers/event.controller";
import {
  verifyCustomer,
  verifyEventOrganizer,
} from "../middlewares/role.middleware";
import {
  validateRefreshToken,
  validateToken,
} from "../middlewares/auth.middleware";
import { blobUploader } from "../lib/multer";

class EventRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }
  initializedRoutes() {
    this.router.get("/", eventController.getAll);
    this.router.get(
      "/yours",
      validateToken,
      verifyEventOrganizer,
      eventController.getByPromotor
    );
    this.router.get("/title", eventController.getByTitle);
    this.router.get("/filter", eventController.filtering);
    this.router.get("/:eventId", eventController.getDetail);
    this.router.post(
      "/e1",
      validateToken,
      verifyEventOrganizer,
      blobUploader().single("image"),
      eventController.createEvent
    );
    this.router.get("/image/:id", eventController.render);
    this.router.patch(
      "/:eventId",
      validateToken,
      verifyEventOrganizer,
      blobUploader().single("image"),
      eventController.updateEvent
    );

    this.router.delete(
      "/:eventId",
      validateToken,
      verifyEventOrganizer,
      eventController.delete
    );
  }

  getRouter() {
    return this.router;
  }
}
export default new EventRouter();
