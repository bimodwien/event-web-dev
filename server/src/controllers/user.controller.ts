"use strict";

import { NextFunction, Request, Response } from "express";
import { UserService, ValidationError } from "../services/user.service";

class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.registerService(req);
      res.status(200).send({
        message: "Register Success",
        data,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({
          message: "Registeration Failed",
          error: error.message,
        });
      } else {
        res.status(500).send({
          message: "Registeration Failed",
          error: "unexpected error",
        });
      }
      // next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh_token, access_token } = await UserService.loginService(
        req
      );
      res
        .status(200)
        .cookie("access_token", access_token)
        .cookie("refresh_token", refresh_token)
        .send({ message: "login success" });
    } catch (error) {
      next(error);
    }
  }
  static async renderAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const blob = await UserService.render(req);
      res.set("Content-type", "image/png");
      res.send(blob);
    } catch (err) {
      next(err);
    }
  }

  static async verifiedUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("masuk");

      const data = await UserService.emailVerification(req);
      res.send({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async validateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const access_token = await UserService.validate(req);
      res.send({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async requestReset(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.requestResetPassword(req);
      res.send({
        response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    console.log("controller ");
    try {
      const response = await UserService.resetPassword(req);
      res.send({
        response,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
