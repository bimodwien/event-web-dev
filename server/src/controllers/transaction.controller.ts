"use strict";

import { Request, Response, NextFunction } from "express";

class TransactionController {
  static async getAllTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("masuk get all controller transaction");
      res.status(200).send({
        message: "Get all transaction berhasil",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default TransactionController;
