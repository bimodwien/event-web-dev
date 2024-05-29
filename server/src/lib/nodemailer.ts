"use strict";
import nodemailer from "nodemailer";
import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } from "../config";
import fs from "fs";
import { join } from "path";
import { render } from "mustache";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});

export async function sendEmail(
  emailTo: string,
  templateDir: string,
  href: string,
  subject: string
) {
  const template = fs.readFileSync(join(__dirname, templateDir)).toString();
  if (template) {
    const html = render(template, {
      email: emailTo,
      href,
    });
    await transporter.sendMail({
      to: emailTo,
      subject,
      html,
    });
  }
}
