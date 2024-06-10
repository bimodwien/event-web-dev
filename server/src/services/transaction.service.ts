"use strict";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class TransactionService {
  static async getAll() {
    const data = await prisma.transaction.findMany({
      select: {
        id: true,
        status: true,
        paid_at: true,
        total_price: true,
        total_ticket: true,
        event: {
          select: {
            id: true,
            title: true,
            start_event: true,
            end_event: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return data;
  }

  static async getDetail(req: Request) {
    const { id } = req.params;
    const data = await prisma.transaction.findFirst({
      where: {
        id,
      },
    });
  }
}

export default TransactionService;
