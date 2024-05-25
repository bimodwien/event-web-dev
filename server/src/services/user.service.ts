"use strict";

import { Request } from "express";
import prisma from "../lib/prisma";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import { Prisma } from "@prisma/client";
import { TUser } from "../models/user.model";
import { createToken } from "../lib/jwt";

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
    const { username, email, name, password, role } = req.body;

    const existingUser = await prisma.user.findMany({
      where: {
        OR: [username, email],
      },
    });
    if (existingUser) throw new Error("User has been used");

    const hashed = await hashPassword(String(password));
    const data: Prisma.UserCreateInput = {
      email,
      password: hashed,
      username,
      name,
    };
    const registering = await prisma.user.create({
      data,
      select: {
        email,
        username,
      },
    });
    return registering;
  }
}

export default UserService;
