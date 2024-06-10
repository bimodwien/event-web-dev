import { Request } from "express";
import prisma from "../lib/prisma";
import { MaxBuy } from "@prisma/client";
class TransactionService {
  async getAll(req: Request) {
    const data = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });

    return data;
  }

  async getByCustomer(req: Request) {
    const data = await prisma.transaction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    return data;
  }

  async getByEvent(req: Request) {
    const { eventId } = req.params;
    const data = await prisma.transaction.findMany({
      where: { eventId: eventId },
      orderBy: { createdAt: "desc" },
    });

    return data;
  }

  async getByOrganizer(req: Request) {
    const data = await prisma.transaction.findMany({
      where: {
        event: { userId: req.user.id },
      },
      orderBy: { createdAt: "desc" },
    });

    return data;
  }

  async getDetail(req: Request) {
    const { id } = req.params;
    const data = await prisma.transaction.findUnique({
      where: { id: id },
    });

    return data;
  }

  async create(req: Request) {
    const { eventId } = req.params;
    const { total_ticket, point, voucher } = req.body;

    // cek user poin ada apa ga
    if (!req.user || req.user.point === undefined) {
      throw new Error("User/ point not found");
    }

    const maxBuy: { [key in MaxBuy]: number } = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
    };

    const limit = maxBuy[req.event.max_buy as MaxBuy];

    // harus input jumlah tiket yang dibeli
    if (typeof total_ticket !== "number" || total_ticket < 1) {
      throw new Error("Masukkan jumlah tiket yang valid");
    }

    // jumlah tiket tidak lebih dari max buy
    if (total_ticket > limit) {
      throw new Error("Jumlah tiket melebihi batas pembelian");
    }
    let totalPrice;

    // kalo type event free maka price 0 & ga bisa pakai point/voucher
    if (req.event.type === "free") {
      totalPrice = 0;
      if (point || voucher) {
        throw new Error("point and voucher can't be use in this type event");
      }
    }

    // kalo type paid maka price = tiket price / promo price
    // klo ada, mau pakai point / voucher *salah satu
    else if (req.event.type === "paid") {
      if (point && voucher) {
        throw new Error("please only chose one");
      } else if (point) {
        totalPrice = total_ticket * req.event.ticket_price - req.user.point;
      } else if (voucher) {
      }
    }
  }

  async update(req: Request) {}

  async delete(req: Request) {
    const { transactionId } = req.params;
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!existingTransaction) throw new Error("transaction not found");

    return await prisma.transaction.delete({
      where: { id: transactionId },
    });
  }
}

export default new TransactionService();
