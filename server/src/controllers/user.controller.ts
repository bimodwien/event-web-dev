"use strict";

import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.registerService(req);
      res.status(200).send({
        message: "Register Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
