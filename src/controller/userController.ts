import { registerUser } from "../services/registerUser";
import { generateCrypto } from "../services/generateCrypto";
import { sendConfirmationMail } from "../services/sendEmail";
import type { RequestHandler } from "express";
import { parseUserRegisterCredentials } from "../services/userValidation";
import type { ZodError } from "zod";
import { insertActivationCode } from "../services/databaseServices/insertActivationCode";
import { findUserBy } from "../services/databaseServices/findUserBy";

export const userRegisterController: RequestHandler = async (
  req,
  res,
  _next
) => {
  const { username, password, email } = req.body;
  const userCredentials = await parseUserRegisterCredentials({
    username,
    password,
    email,
  });
  if (userCredentials[0]) {
    const errors = userCredentials.map((error: ZodError) => error.message);
    res.status(403).json({ errors });
  } else {
    const { username, password, email } = userCredentials;
    const user = await findUserBy({ username, email });
    if (!user) {
      res.status(401).json({ message: "Wrong username or email" });
    } else {
      const authCode = await generateCrypto();
      const instanceOfInsert = await insertActivationCode(authCode);
      if (instanceOfInsert) {
        const authCodeId = instanceOfInsert.get("authCodeId");
        const { message } = await registerUser(
          { username, password, email },
          authCodeId
        );
        await sendConfirmationMail(email, authCode);
        res.status(201).json({ message });
      }
    }
  }
};
export const userLogoutController: RequestHandler = (req, res, _next) => {
  req.logout();
  req.session = undefined;
  res.clearCookie("connect.sid");
  res.status(204);
};
