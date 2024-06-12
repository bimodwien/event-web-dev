"use strict";

import { Request } from "express";
import prisma from "../lib/prisma";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import { $Enums, Prisma } from "@prisma/client";
import { TUser } from "../models/user.model";
import { sendEmail } from "../lib/nodemailer";
import { createToken } from "../lib/jwt";
import { randomBytes } from "crypto";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import sharp from "sharp";

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

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
        name: true,
        password: true,
        gender: true,
        address: true,
        referralCode: true,
        point: true,
        role: true,
        avatarUrl: true,
      },
    })) as TUser;
    if (!user?.password) throw new ValidationError("Wrong email or password");

    const checkUser = await comparePassword(user.password, password);
    if (!checkUser) throw new ValidationError("Wrong Password");
    delete user.password;

    const access_token = createToken({ user, type: "access-token" }, "15m");
    const refresh_token = createToken({ user, type: "refresh-token" }, "1hr");

    return { access_token, refresh_token };
  }

  static async registerService(req: Request) {
    await prisma.$transaction(async (prisma) => {
      const username: string = req.body.username;
      const email: string = req.body.email;
      const name: string = req.body.name;
      const password: string = req.body.password;
      const roleInput: string = req.body.role;
      const referenceCode: string = req.body.referenceCode;

      const pointExpiredDate = new Date();
      pointExpiredDate.setMonth(pointExpiredDate.getMonth() + 3);

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existingUser) throw new ValidationError("User has been used");

      const hashed = await hashPassword(String(password));

      const role =
        (roleInput == "eventOrganizer" && $Enums.Role.eventOrganizer) ||
        (roleInput == "customer" && $Enums.Role.customer) ||
        null;
      if (role == null) {
        throw new ValidationError("Invalid value for role field");
      }

      if (referenceCode) console.log(referenceCode);

      const isReferenceCodeExisted = await prisma.user.findFirst({
        where: {
          referralCode: referenceCode,
        },
      });

      const referralCode =
        role === $Enums.Role.eventOrganizer
          ? ""
          : randomBytes(10).toString("hex");

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

      const verifyToken = createToken({ id: newUser.id }, "1hr");
      sendEmail(
        String(newUser.email),
        "../templates/verification.html",
        `http://localhost:3001/verification/${verifyToken}`,
        "Thank you for registering, please verify your email"
      );
    });
  }

  static async emailVerification(req: Request) {
    const token =
      req.headers.authorization?.replace("Bearer ", "").toString() || "";

    const { id } = verify(token, SECRET_KEY) as TUser;

    const data = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isVerified: true,
      },
    });

    return data;
  }

  static async requestResetPassword(req: Request) {
    const email = req.body.email;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const resetToken = createToken({ userId: user.id }, "1hr");

    const resetLink = `http://localhost:3001/reset-token/${resetToken}`;

    await sendEmail(
      String(user.email),
      "../templates/reset-password.html",
      resetLink,
      "Please verify your email to reset password"
    );
    return { message: "Password email has been sent" };
  }

  static async resetPassword(req: Request) {
    const token =
      req.headers.authorization?.replace("Bearer ", "").toString() || "";
    const password: string = req.body.password;
    const { userId } = verify(token, SECRET_KEY) as { userId: string };

    const newPassword = await hashPassword(String(password));

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ValidationError("User not found");
    }

    const data = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        password: String(newPassword),
      },
    });

    return data;
  }

  static async validate(req: Request) {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        isVerified: true,
        name: true,
        username: true,
        gender: true,
        role: true,
        referralCode: true,
        birthDate: true,
        address: true,
        phone: true,
        avatarUrl: true,
        point: true,
        pointExpiredDate: true,
      },
      where: {
        id: req.user.id,
      },
    });

    return createToken(
      {
        user,
        type: "access-token",
      },
      "15m"
    );
  }

  static async render(req: Request) {
    const data = await prisma.user.findUnique({
      where: {
        avatarUrl: req.params.id,
      },
    });

    return data?.imageProfile;
  }

  static async edit(req: Request) {
    const name: string = req.body.name;
    const address: string = req.body.address;
    const gender: string = req.body.gender;
    const phone: string = req.body.phone;
    const { file } = req;

    const genders =
      (gender === "male" && $Enums.Gender.male) ||
      (gender === "female" && $Enums.Gender.female) ||
      null;

    const data: Prisma.UserUpdateInput = {
      name,
      address,
      phone,
      gender: genders,
    };

    if (file) {
      const buffer = await sharp(req.file?.buffer).png().toBuffer();

      data.imageProfile = buffer;
      data.avatarUrl = String(req.user.id) + new Date().getTime();
    }
    await prisma.user.update({
      data,
      where: {
        id: String(req.user.id),
      },
    });

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        isVerified: true,
        name: true,
        username: true,
        gender: true,
        role: true,
        referralCode: true,
        birthDate: true,
        address: true,
        phone: true,
        avatarUrl: true,
      },
      where: {
        avatarUrl: req.user.id,
        id: req.user.id,
      },
    });

    return createToken(
      {
        user,
        type: "access-token",
      },
      "15m"
    );
  }
}

export { UserService, ValidationError };
