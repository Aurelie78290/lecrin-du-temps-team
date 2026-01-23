import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendResetPasswordEmail = async (
  to: string,
  subject: string,
  html: string,
) => {
  try {
    const info = await transporter.sendMail({
      from: `"L'Écrin du Temps <noreply@lecrindutemps.com>`,
      to,
      subject,
      html: html,
    });
    console.info("Email envoyé : %s", info.messageId);
    return info;
  } catch (err) {
    console.error("Erreur lors de l'envoi du mail:", err);
    throw err;
  }
};

export default transporter;
