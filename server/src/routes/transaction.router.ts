"use strict";

import { Router } from "express";
import {
  verifyCustomer,
  verifyEventOrganizer,
} from "../middlewares/role.middleware";
import {
  validateRefreshToken,
  validateToken,
} from "../middlewares/auth.middleware";
import { blobUploader } from "../lib/multer";
import transactionController from "../controllers/transaction.controller";

class TransactionRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }
  initializedRoutes() {
    this.router.get("/", transactionController.getAll);

    this.router.get(
      "/yours",
      validateToken,
      verifyCustomer,
      transactionController.getPaymentByBuyer
    );

    this.router.get(
      "/point-voucher",
      validateToken,
      verifyCustomer,
      transactionController.getPointVoucher
    );

    this.router.get(
      "/event/:eventId",
      validateToken,
      verifyEventOrganizer,
      transactionController.getByEventId
    );

    this.router.get(
      "/:transactionId",
      validateToken,
      verifyCustomer,
      transactionController.getDetail
    );

    this.router.post(
      "/:eventId",
      validateToken,
      verifyCustomer,
      transactionController.createTransaction
    );

    this.router.get(
      "/customer",
      validateToken,
      verifyCustomer,
      transactionController.getDetailByCustomer
    );
    this.router.get("/proof/:id", transactionController.renderProof);

    // this.router.post(
    //   "/:eventId",
    //   validateToken,
    //   verifyCustomer,
    //   transactionController.createTransaction
    // );

    this.router.patch(
      "/:transactionId",
      validateToken,
      verifyCustomer,
      blobUploader().single("paid_proof"),
      transactionController.updateTransaction
    );

    this.router.delete(
      "/:eventId",
      validateToken,
      verifyEventOrganizer,
      transactionController.delete
    );
  }

  getRouter() {
    return this.router;
  }
}
export default new TransactionRouter();
