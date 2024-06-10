import { NextFunction, Request, Response } from "express";
import eventService from "../services/event.service";

class EventController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.getAll(req);
      return res.send({
        message: "fetch all event",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.getDetail(req);
      return res.send({
        message: "detail event",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByTitle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.getEventByTitle(req);
      return res.send({
        message: "fetch all event by title",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByPromotor(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.getByPromotor(req);
      return res.send({
        message: "your events",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async filtering(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.getByFilter(req);
      return res.send({
        message: "fetch all event by fillter",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("masuk kedalam controller create event");

      await eventService.createEvent(req);
      res.status(201).send({
        message: "new event created",
      });
    } catch (error) {
      next(error);
    }
  }

  async render(req: Request, res: Response, next: NextFunction) {
    try {
      const blob = await eventService.render(req);
      res.set("Content-type", "image/png");
      res.send(blob);
    } catch (error) {
      next(error);
    }
  }

  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      await eventService.updateEvent(req);
      return res.send({
        message: "event has been updated",
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await eventService.delete(req);
      return res.send({
        message: "event has been deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}
export default new EventController();
