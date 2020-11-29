import { createTransport } from "nodemailer";
import { myOAuth2Client } from "../index";

myOAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
});
const myAccessToken = myOAuth2Client.getAccessToken();
const MAIL_SUBJECT = "Please confirm your registration process";

const transporter = createTransport({
  //@ts-ignore
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "OAuth2",
    user: "muzykancizgruzji@gmail.com",
    clientId: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    accessToken: myAccessToken,
  },
});

const prepareTextForMail = (activationCode: string) => {
  return `To activate your account: <a href="${process.env.MAIL_SITE_TARGET}/confirmaccount/${activationCode}">Click here</a>`;
};

export const sendConfirmationMail = async (
  to: string,
  activationCode: string
) => {
  return transporter.sendMail(
    {
      from: process.env.GMAIL_FROM,
      to,
      subject: MAIL_SUBJECT,
      html: prepareTextForMail(activationCode),
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message %s sent: %s", info.messageId, info.response);
    }
  );
};
