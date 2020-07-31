import { createTransport } from "nodemailer";

const MAIL_SUBJECT = "Please confirm your registration process";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_LOGIN,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const prepareTextForMail = (activationCode: string) => {
  return `To activate your account: <a href="http://localhost:3000/confirmAccount/${activationCode}">Click here</a>`;
};

export const sendConfirmationMail = async (
  to: string,
  activationCode: string
) => {
  return transporter.sendMail({
    from: "muzykancizgruzji@gmail.com",
    to: to,
    subject: MAIL_SUBJECT,
    html: prepareTextForMail(activationCode),
  });
};
