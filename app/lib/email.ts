import nodemailer from "nodemailer";

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

const sendMail = async (data: EmailOptions) => {
  try {
    const { from, to, subject, text, html } = data;

    const transporter = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.MAIL_HOST!,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    return info.messageId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendMail;
