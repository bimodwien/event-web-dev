"use strict";

import { Request } from "express";
import prisma from "../lib/prisma";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import { $Enums, Prisma } from "@prisma/client";
import { TUser } from "../models/user.model";
import { createToken } from "../lib/jwt";
import { randomBytes } from "crypto";

class UserService {
  static async loginService(req: Request) {
    const { username, password } = req.body;
    const user = (await prisma.user.findFirst({
      where: {
        username: String(username),
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    })) as TUser;
    if (!user?.password) throw new Error("Wrong email or password");

    const checkUser = await comparePassword(user.password, password);
    if (!checkUser) throw new Error("Wrong Password");
    delete user.password;

    return createToken(user, "1d");
  }

  static async registerService(req: Request) {
    const username: string = req.body.username;
    const email: string = req.body.email;
    const name: string = req.body.name;
    const password: string = req.body.password;
    const roleInput: string = req.body.role;
    const referenceCode: string = req.body.referenceCode;
    const referralCode = randomBytes(10).toString("hex");

    const date = new Date();
    date.setMonth(date.getMonth() + 3);

    if (referenceCode && referenceCode != "") {
      const isReferralCodeExisted = await prisma.user.findFirst({
        where: {
          referralCode: referenceCode,
        },
      });

      if (!isReferralCodeExisted) {
        throw new Error("Invalid Referral Code");
      }
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (existingUser) throw new Error("User has been used");

    const hashed = await hashPassword(String(password));

    const role =
      (roleInput == "eventOrganizer" && $Enums.Role.eventOrganizer) ||
      (roleInput == "customer" && $Enums.Role.customer) ||
      null;
    if (role == null) {
      throw new Error("Invalid value for role field");
    }

    // Prisma.UserScalarFieldEnum.
    const data: Prisma.UserCreateInput = {
      email,
      password: hashed,
      username,
      name,
      role,
      referralCode,
      usedReferralCode: referenceCode,
      Vouchers: {
        create: [{ ammount: 10, expiredDate: date }],
      },
    };
    const registering = await prisma.user.create({
      data,
      select: {
        email: true,
        username: true,
      },
    });
    return registering;
  }
}

export default UserService;
