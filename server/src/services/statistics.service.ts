import prisma from "../lib/prisma";
import { Request } from "express";
import dayjs from "dayjs";

class StatisticService {
  async getStatisticsData(req: Request) {
    const { period } = req.query;
    const userId = req.user?.id;

    if (!userId) {
      throw new Error("user not found");
    }

    let dateRange: { gte: Date; lte: Date };

    switch (period) {
      case "day":
        dateRange = {
          gte: dayjs().startOf("day").toDate(),
          lte: dayjs().endOf("day").toDate(),
        };
        break;
      case "month":
        dateRange = {
          gte: dayjs().startOf("month").toDate(),
          lte: dayjs().endOf("month").toDate(),
        };
        break;
      case "year":
        dateRange = {
          gte: dayjs().startOf("year").toDate(),
          lte: dayjs().endOf("year").toDate(),
        };
        break;
      default:
        dateRange = {
          gte: dayjs().subtract(1, "month").toDate(),
          lte: new Date(),
        };
        break;
    }

    //  total pendapatan
    const totalRevenue = await prisma.transaction.aggregate({
      where: {
        event: { userId: userId },
        status: "paid",
        createdAt: dateRange,
      },
      _sum: { total_price: true },
    });

    const totalRevenueAmount = totalRevenue._sum.total_price || 0;

    //  total tiket terjual
    const totalSoldTickets = await prisma.transaction.aggregate({
      where: {
        event: { userId: userId },
        status: "paid",
        createdAt: dateRange,
      },
      _sum: { total_ticket: true },
    });

    const totalSoldTicketsCount = totalSoldTickets._sum.total_ticket || 0;

    // total event yang dimiliki
    const totalEvents = await prisma.event.count({
      where: {
        userId: userId,
        createdAt: dateRange,
      },
    });

    // total sisa tiket (tidak terjual)
    const totalAvailableTickets = await prisma.event.aggregate({
      where: {
        userId: userId,
        createdAt: dateRange,
      },
      _sum: { ticket_available: true },
    });

    const totalAvailableTicketsCount =
      totalAvailableTickets._sum.ticket_available || 0;
    const totalUnsoldTicketsCount =
      totalAvailableTicketsCount - totalSoldTicketsCount;

    return {
      totalRevenueAmount,
      totalSoldTicketsCount,
      totalEvents,
      totalUnsoldTicketsCount,
    };
  }
}

export default new StatisticService();
