import { Request } from "express";
import prisma from "../lib/prisma";
import { CategoryName, City, Prisma } from "@prisma/client";
import sharp from "sharp";
import { TEvent } from "../models/event.model";

class EventService {
  async getAll(req: Request) {
    const data = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        title: true,
        city: true,
        start_event: true,
        end_event: true,
        ticket_price: true,
        user: { select: { username: true } },
      },
    });
    return data;
  }

  async getEventByTitle(req: Request) {
    const { title } = req.query;
    if (!title || typeof title !== "string") {
      throw new Error("Invalid search parameter");
    }

    const data = await prisma.event.findMany({
      where: {
        title: { contains: title },
      },
      select: {
        title: true,
        city: true,
        start_event: true,
        end_event: true,
        ticket_price: true,
        user: { select: { username: true } },
      },
    });

    if (!data || data.length === 0) {
      throw new Error("Event Not Found");
    }

    return data;
  }

  async getByFilter(req: Request) {
    const { city, category } = req.query;
    let filtering: any = {};

    if (category) {
      filtering.category = category as CategoryName;
    }

    if (city) {
      filtering.city = city as City;
    }
    const data = await prisma.event.findMany({
      where: filtering,
      select: {
        title: true,
        city: true,
        start_event: true,
        end_event: true,
        ticket_price: true,
        user: { select: { username: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!data || data.length === 0) throw new Error("Event not found");

    return data;
  }

  async getDetail(req: Request) {
    const { eventId } = req.params;
    const data = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        title: true,
        city: true,
        location: true,
        address: true,
        start_event: true,
        end_event: true,
        ticket_available: true,
        ticket_price: true,
        promotion: true,
        user: { select: { username: true } },
      },
    });

    return data;
  }

  async getByPromotor(req: Request) {
    const data = await prisma.event.findMany({
      where: {
        userId: req.user?.id,
      },
      select: {
        title: true,
        city: true,
        start_event: true,
        end_event: true,
        ticket_price: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  }

  async createEvent(req: Request) {
    const {
      title,
      city,
      location,
      address,
      start_event,
      end_event,
      description,
      terms_conditions,
      category,
      type,
      ticket_available,
      ticket_price,
      max_buy,
      promotion,
      start_promo,
      end_promo,
    } = req.body as TEvent;
    const { file } = req;

    const existingEvent = await prisma.event.findMany({
      where: {
        title,
      },
    });

    if (existingEvent.length)
      throw new Error("Event with the same title already exists");

    const buffer = await sharp(req.file?.buffer).png().toBuffer();
    if (!file) throw new Error("no file image uploaded");

    const eventPrice = type === "free" ? 0 : Number(ticket_price);

    if (promotion && (!start_promo || !end_promo)) {
      throw new Error("start & end promotion must be provided");
    }

    const data: Prisma.EventCreateInput = {
      title,
      city,
      location,
      address,
      start_event: new Date(start_event).toISOString(),
      end_event: new Date(end_event),
      description,
      terms_conditions,
      image: buffer,
      category,
      type,
      ticket_available: Number(ticket_available),
      ticket_price: eventPrice,
      max_buy,
      promotion,
      start_promo: start_promo ? new Date(start_promo) : undefined,
      end_promo: end_promo ? new Date(end_promo) : undefined,
      user: {
        connect: {
          id: req.user?.id,
        },
      },
    };

    return await prisma.event.create({ data });
  }

  async render(req: Request) {
    const data = await prisma.event.findUnique({
      where: {
        id: req.params.id,
      },
    });
    return data?.image;
  }

  async updateEvent(req: Request) {
    const { eventId } = req.params;
    const { file } = req;
    const data: Prisma.EventUpdateInput = { ...req.body };

    if (file) {
      const buffer = await sharp(req.file?.buffer).png().toBuffer();
      data.image = buffer;
    }

    if (
      typeof data.start_promo === "string" ||
      data.start_promo instanceof Date
    ) {
      data.start_promo = new Date(data.start_promo);
    }
    if (typeof data.end_promo === "string" || data.end_promo instanceof Date) {
      data.end_promo = new Date(data.end_promo);
    }

    return await prisma.event.update({
      data,
      where: { id: eventId, userId: req.user?.id },
    });
  }

  async delete(req: Request) {
    const { eventId } = req.params;

    return await prisma.event.delete({
      where: { id: eventId },
    });
  }
}
export default new EventService();
