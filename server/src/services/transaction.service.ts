import { Request } from "express";
import prisma from "../lib/prisma";
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
    const { eventId, total_ticket, point, voucher } = req.body;

    // if (!total_ticket || !eventId) {
    //   throw new Error("Missing required fields");
    // }

    // let max = event.

    if (total_ticket < 1) {
      throw new Error("input amount");
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