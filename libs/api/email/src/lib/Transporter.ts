import * as nodemailer from "nodemailer";

export function getTransporter() {
  const transporter = nodemailer.createTransport({
    host: process.env.NX_SMTP || "",
    port: (process.env.NX_SMTP_PORT) ? +process.env.NX_SMTP_PORT : 0,
    secure: (process.env.NX_SMTP_PORT && process.env.NX_SMTP_PORT === "true") ? true : false,
    auth: {
      user: process.env.NX_EMAIL || "",
      pass: process.env.NX_EMAIL_PASSWORD || ""
    }
  })

  return transporter;
}
