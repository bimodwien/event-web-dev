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

    const token = createToken(user, "1h");

    return token;
  }

  static async registerService(req: Request) {
    prisma.$transaction(async (prisma) => {
      const username: string = req.body.username;
      const email: string = req.body.email;
      const name: string = req.body.name;
      const password: string = req.body.password;
      const roleInput: string = req.body.role;
      const referenceCode: string = req.body.referenceCode;
      const referralCode = randomBytes(10).toString("hex");

      const pointExpiredDate = new Date();
      pointExpiredDate.setMonth(pointExpiredDate.getMonth() + 3);

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

      if (referenceCode) console.log(referenceCode);

      const isReferenceCodeExisted = await prisma.user.findFirst({
        where: {
          referralCode: referenceCode,
        },
      });

      // if (!isReferenceCodeExisted) {
      //   throw new Error("Invalid Referral Code");
      // }
      // Prisma.UserScalarFieldEnum.
      const data: Prisma.UserCreateInput = {
        email,
        password: hashed,
        username,
        name,
        role,
        referralCode,
        usedReferralCode: referenceCode,
      };
      const newUser = await prisma.user.create({
        data,
      });
      if (isReferenceCodeExisted) {
        await prisma.voucher.create({
          data: {
            ammount: 10,
            userId: newUser.id,
          },
        });

        await prisma.user.update({
          data: {
            point: isReferenceCodeExisted.point + 10000,
            pointExpiredDate,
          },
          where: {
            id: isReferenceCodeExisted.id,
          },
        });
      }
    });
  }
}

export default UserService;
