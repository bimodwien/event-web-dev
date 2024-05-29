"use strict";

import { CorsOptions } from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 8000;

const SECRET_KEY = process.env.SECRET_KEY || "";

const corsOption: CorsOptions = {
  origin: `http://localhost:3001`,
  credentials: true,
};

const NODEMAILER_EMAIL = process.env.EMAIL || "";
const NODEMAILER_PASSWORD = process.env.PASSWORD || "";

export { PORT, corsOption, SECRET_KEY, NODEMAILER_EMAIL, NODEMAILER_PASSWORD };
