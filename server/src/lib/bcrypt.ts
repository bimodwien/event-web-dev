"use strict";

import { hash, genSalt, compare } from "bcrypt";

async function hashPassword(password: string) {
  const salt = await genSalt(10);
  return await hash(password, salt);
}

async function comparePassword(hashPassword: string, password: string) {
  return await compare(password, hashPassword);
}

export { hashPassword, comparePassword };
