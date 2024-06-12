"use strict";
import { NextFunction, Request, Response } from "express";
import transactionService from "../services/transaction.service";

class TransactionController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await transactionService.getAll(req);
      return res.send({
        message: "fetch all transaction",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await transactionService.getDetail(req);
      return res.send({
        message: "detail transaction",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  //   async getByTitle(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const data = await transactionService.gettransactionByTitle(req);
  //       return res.send({
  //         message: "fetch all transaction by title",
  //         data,
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async getByPromotor(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const data = await transactionService.getByPromotor(req);
  //       return res.send({
  //         message: "your transactions",
  //         data,
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async filtering(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const data = await transactionService.getByFilter(req);
  //       return res.send({
  //         message: "fetch all transaction by fillter",
  //         data,
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("masuk kedalam controller create transaction");

      await transactionService.create(req);
      res.status(201).send({
        message: "new transaction created",
      });
    } catch (error) {
      next(error);
    }
  }

  //   async render(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const blob = await transactionService.render(req);
  //       res.set("Content-type", "image/png");
  //       res.send(blob);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  async updateTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      await transactionService.update(req);
      return res.send({
        message: "transaction has been updated",
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await transactionService.delete(req);
      return res.send({
        message: "transaction has been deleted",

      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();