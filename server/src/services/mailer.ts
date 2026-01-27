import nodemailer from "nodemailer";

// On configure le transporter //
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Pour envoyer le mail de réinitialisation //
export const sendResetPasswordEmail = async (
  to: string,
  subject: string,
  html: string,
) => {
  try {
    // On envoie le mail //
    const info = await transporter.sendMail({
      from: `"L'Écrin du Temps <noreply@lecrindutemps.com>`,
      to,
      subject,
      html: html,
    });
    // On informe du succes de l'envoi //
    console.info("Email envoyé : %s", info.messageId);
    return info;
    // On gère les erreurs d'envoi //
  } catch (err) {
    console.error("Erreur lors de l'envoi du mail:", err);
    throw err;
  }
};

export default transporter;
