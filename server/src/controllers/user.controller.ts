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
}

export default UserController;
