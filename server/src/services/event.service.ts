import { Request } from "express";
import prisma from "../lib/prisma";
import { CategoryName, City, Prisma, PromoList } from "@prisma/client";
import sharp from "sharp";
import { TEvent } from "../models/event.model";

class EventService {
  async getAll(req: Request) {
    const data = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        city: true,
        start_event: true,
        end_event: true,
        ticket_price: true,
        promo_price: true,
        type: true,
        promotion: true,
        user: { select: { id: true, name: true, avatarUrl: true } },
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
    const { city, category, title } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;

    let filtering: any = {};

    if (title) {
      filtering.title = {
        contains: title as string,
      };
    }

    if (category) {
      filtering.category = category as CategoryName;
    }

    if (city) {
      filtering.city = city as City;
    }

    const currentDate = new Date();
    filtering.end_event = {
      gte: currentDate,
    };

    const skip = (page - 1) * limit;

    const data = await prisma.event.findMany({
      where: filtering,
      select: {
        id: true,
        title: true,
        city: true,
        start_event: true,
        end_event: true,
        ticket_price: true,
        promo_price: true,
        type: true,
        promotion: true,
        category: true,
        start_promo: true,
        end_promo: true,
        user: { select: { id: true, name: true, avatarUrl: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: limit,
    });

    if (!data || data.length === 0) throw new Error("Event not found");

    return data;
  }

  async getDetail(req: Request) {
    const { eventId } = req.params;
    const data = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        location: true,
        city: true,
        address: true,
        start_event: true,
        end_event: true,
        image: true,
        ticket_price: true,
        promo_price: true,
        description: true,
        terms_conditions: true,
        ticket_available: true,
        max_buy: true,
        type: true,
        category: true,
        promotion: true,
        start_promo: true,
        end_promo: true,
        user: { select: { id: true, name: true } },
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
        id: true,
        title: true,
        city: true,
        start_event: true,
        end_event: true,
        ticket_price: true,
        promo_price: true,
        type: true,
        promotion: true,
        user: { select: { username: true } },
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

    // Cek jika event dengan judul yang sama sudah ada
    const existingEvent = await prisma.event.findMany({
      where: {
        title,
      },
    });

    if (existingEvent.length)
      throw new Error("Event with the same title already exists");

    // Ubah gambar menjadi buffer
    const buffer = await sharp(req.file?.buffer).png().toBuffer();
    if (!file) throw new Error("no file image uploaded");

    let eventPrice;
    let discountPrice = null;

    if (type === "free") {
      eventPrice = 0;
      if (promotion || start_promo || end_promo) {
        throw new Error(
          "Promotion, start_promo, and end_promo must not be provided for free events"
        );
      }
    } else if (type === "paid") {
      if (!ticket_price) {
        throw new Error("Ticket price must be provided for paid events");
      }
      eventPrice = Number(ticket_price);

      if (promotion && (!start_promo || !end_promo)) {
        throw new Error("start & end promotion must be provided");
      } else if (promotion && start_promo && end_promo) {
        if (new Date(start_promo) > new Date(start_event)) {
          throw new Error("promotion must start before the event start");
        } else if (new Date(end_promo) > new Date(start_event)) {
          throw new Error("promotion must end before the event start");
        }

        const promoDiscounts: { [key in PromoList]: number } = {
          five: 0.05,
          ten: 0.1,
          fifth_teen: 0.15,
          twenty: 0.2,
          twenty_five: 0.25,
          forty: 0.4,
          fifty: 0.5,
        };
        const discount =
          promoDiscounts[promotion as keyof typeof promoDiscounts];
        discountPrice = ticket_price
          ? ticket_price - ticket_price * discount
          : null;
      }
    } else {
      throw new Error("Invalid event type");
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
      promo_price: discountPrice,
      max_buy,
      promotion: type === "paid" ? promotion : null,
      start_promo:
        type === "paid" ? (start_promo ? new Date(start_promo) : null) : null,
      end_promo:
        type === "paid" ? (end_promo ? new Date(end_promo) : null) : null,
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

    const currentEvent = await prisma.event.findUnique({
      where: { id: eventId, userId: req.user?.id },
      select: { start_event: true, ticket_price: true, type: true },
    });
    if (!currentEvent) {
      throw new Error("Event not found");
    }

    const data: Prisma.EventUpdateInput = { ...req.body };

    if (data.type && data.type !== currentEvent.type) {
      throw new Error("Cannot change event type");
    }

    if (currentEvent.type === "free") {
      if (
        data.ticket_price !== undefined ||
        data.promotion !== undefined ||
        data.start_promo !== undefined ||
        data.end_promo !== undefined
      ) {
        throw new Error(
          "Cannot update ticket_price, promotion, start_promo, or end_promo for free events"
        );
      }
    } else if (currentEvent.type === "paid") {
      const promoDiscounts: { [key in PromoList]: number } = {
        five: 0.05,
        ten: 0.1,
        fifth_teen: 0.15,
        twenty: 0.2,
        twenty_five: 0.25,
        forty: 0.4,
        fifty: 0.5,
      };

      const promotion = req.body.promotion as PromoList;
      const ticket_price =
        req.body.ticket_price !== undefined
          ? parseFloat(req.body.ticket_price)
          : currentEvent.ticket_price ?? 0;
      if (promotion) {
        if (!req.body.start_promo || !req.body.end_promo) {
          throw new Error("start & end promotion must be provided");
        }

        const start_promo = new Date(req.body.start_promo);
        const end_promo = new Date(req.body.end_promo);
        const start_event = new Date(currentEvent.start_event);
        console.log(start_event);

        if (start_promo > start_event) {
          throw new Error("promotion must start before the event start");
        }

        if (end_promo > start_event) {
          throw new Error("promotion must end before the event start");
        }

        if (start_promo > end_promo) {
          throw new Error("input the right date to start promotion");
        }

        const discount = promoDiscounts[promotion];
        const discountPrice = ticket_price - ticket_price * discount;

        data.promotion = promotion;
        data.promo_price = discountPrice;
      }

      data.ticket_price = ticket_price;
    }

    if (data.ticket_available !== undefined) {
      data.ticket_available = Number(data.ticket_available);
    }

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

    if (
      typeof data.start_event === "string" ||
      data.start_event instanceof Date
    ) {
      data.start_event = new Date(data.start_event);
    }
    if (typeof data.end_event === "string" || data.end_event instanceof Date) {
      data.end_event = new Date(data.end_event);
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
