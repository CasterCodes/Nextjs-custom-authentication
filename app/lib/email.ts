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
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "41de871033e356",
        pass: "346990cfadbf49",
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
