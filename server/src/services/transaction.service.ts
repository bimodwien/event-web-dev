import { Request } from "express";
import prisma from "../lib/prisma";
import { MaxBuy, Status } from "@prisma/client";
import sharp from "sharp";
import { TTransaction } from "../models/transaction.model";

class TransactionService {
  async getAll(req: Request) {
    const data = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
    });

    return data;
  }

  async getByCustomer(req: Request) {
    const userId = req.user?.id;
    // console.log(req.user);

    const data = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        no_inv: true,
        total_price: true,
        total_ticket: true,
        status: true,
        createdAt: true,
        event: {
          select: {
            id: true,
            image: true,
            title: true,
            ticket_price: true,
            start_event: true,
            end_event: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // console.log("ini data", data);

    return data;
    // return {};
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
    const { transactionId } = req.params;
    const data = await prisma.transaction.findUnique({
      where: { id: transactionId, userId: req.user.id },
      select: {
        id: true,
        no_inv: true,
        total_price: true,
        total_ticket: true,
        status: true,
        createdAt: true,
        event: {
          select: {
            id: true,
            title: true,
            ticket_price: true,
            start_event: true,
            end_event: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return data;
  }

  async getPointVoucher(req: Request) {
    const pointData = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, point: true, pointExpiredDate: true },
    });

    if (!pointData) {
      throw new Error("Voucher not found");
    }

    const voucherData = await prisma.voucher.findUnique({
      where: { userId: req.user.id },
    });

    if (!voucherData) {
      throw new Error("Voucher not found");
    }

    return { point: pointData, voucher: voucherData };
  }

  private generateInvoiceNumber(): string {
    const timestamp = new Date().getTime().toString();
    const randomDigits = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `${timestamp}${randomDigits}`;
  }

  async create(req: Request) {
    const { eventId } = req.params;

    const { total_ticket, point, voucher } = req.body as TTransaction;
    let status: Status = "pending";
    const no_inv = this.generateInvoiceNumber();

    const parsedTotalTicket = Number(total_ticket);

    if (isNaN(parsedTotalTicket) || parsedTotalTicket < 1) {
      throw new Error("Masukkan jumlah tiket yang valid");
    }

    if (!req.user || !req.user.id) {
      throw new Error("User not authenticated or user ID not available");
    }

    req.body.total_ticket = parsedTotalTicket;

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new Error("Invalid event");

    const maxBuy: { [key in MaxBuy]: number } = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
    };

    const limit = maxBuy[event.max_buy as MaxBuy];

    // harus input jumlah tiket yang dibeli

    // console.log(typeof total_ticket);

    // input jumlah tiket sesuai stock
    if (parsedTotalTicket > event.ticket_available) {
      throw new Error("jumlah tiket melebihi stock tersedia");
    }
    if (parsedTotalTicket > limit) {
      // jumlah tiket tidak lebih dari max buy
      throw new Error("Jumlah tiket melebihi batas pembelian");
    }

    let totalPrice: number;
    let checkPrice: number;

    const currentDate = new Date();
    if (
      event.promotion &&
      event.start_promo &&
      event.end_promo &&
      currentDate > event.start_promo &&
      currentDate < event.end_promo
    ) {
      checkPrice = event.promo_price ?? 0;
    } else {
      checkPrice = event.ticket_price ?? 0;
    }

    // console.log("check price: ", checkPrice);

    totalPrice = parsedTotalTicket * checkPrice;

    // console.log("total price: ", totalPrice);

    // kalo type free maka price 0 & ga bisa pakai point/voucher
    if (event.type === "free") {
      //   totalPrice = 0;
      if (point || voucher) {
        throw new Error("point and voucher can't be use in this type event");
      }
      // console.log("price free", totalPrice);
    }

    // kalo type paid maka price = tiket price / promo price
    // pakai point / voucher *salah satu
    else if (event.type === "paid") {
      if (voucher && point) {
        throw new Error("please only chose one");
      } else if (voucher) {
        const checkVoucher = await prisma.voucher.findFirst({
          where: { userId: req.user.id, isUsed: false },
        });

        if (!checkVoucher || checkVoucher.ammount === 0) {
          throw new Error("You have no voucher available");
        }

        const voucherPrice = totalPrice * 0.1;
        totalPrice -= voucherPrice;
        // console.log("voucher: ", totalPrice);

        await prisma.voucher.update({
          where: { userId: req.user.id },
          data: {
            isUsed: true,
            ammount: 0,
          },
        });
      } else if (point) {
        // console.log(req.user.point);
        // console.log(req.user.pointExpiredDate);

        if (!req.user?.point || req.user?.point === 0) {
          throw new Error("point not available");
        }
        if (req.user.point) {
          if (totalPrice <= req.user.point) {
            const newPoint = req.user.point - totalPrice;
            totalPrice = 0;
            await prisma.user.update({
              where: { id: req.user.id },
              data: { point: newPoint },
            });
          } else {
            if (totalPrice !== 0) {
              totalPrice = parsedTotalTicket * checkPrice - req.user.point;
              await prisma.user.update({
                where: { id: req.user.id },
                data: { point: 0, pointExpiredDate: currentDate },
              });
            } else {
              throw new Error("point not available");
            }
          }
          // console.log("price point: ", totalPrice);
        }
      }
    }

    if (totalPrice === 0) {
      status = "paid";
    }
    const transaction = await prisma.$transaction([
      prisma.event.update({
        where: { id: eventId },
        data: {
          ticket_available: event.ticket_available - total_ticket,
        },
      }),
      prisma.transaction.create({
        data: {
          eventId: eventId,
          userId: req.user.id,
          total_ticket: parsedTotalTicket,
          total_price: totalPrice,
          status: status,
          no_inv: no_inv,
        },
      }),
    ]);

    return transaction;
  }

  async update(req: Request) {
    const { transactionId } = req.params;
    const { file } = req;

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId, userId: req.user.id },
    });
    if (!transaction) {
      throw new Error("Transaction not found");
    }

    let status = transaction.status;
    let paid_at = transaction.paid_at;

    if (file) {
      // Jika mengunggah foto, status menjadi "paid" dan paid_at = waktu saat ini
      status = "paid";

      paid_at = new Date();
      const buffer = await sharp(file.buffer).png().toBuffer();

      return await prisma.transaction.update({
        where: { id: transactionId, userId: req.user.id },
        data: { paid_proof: buffer, status, paid_at },
      });
    } else {
      // Jika tidak mengunggah foto, status menjadi "cancelled"
      status = "cancelled";
      paid_at = null;

      const event = await prisma.event.findUnique({
        where: { id: transaction.eventId },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      return await prisma.$transaction([
        prisma.transaction.update({
          where: { id: transactionId, userId: req.user.id },
          data: { status, paid_at },
        }),
        prisma.event.update({
          where: { id: transaction.eventId },
          data: {
            ticket_available: event.ticket_available + transaction.total_ticket,
          },
        }),
      ]);
    }
  }

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
