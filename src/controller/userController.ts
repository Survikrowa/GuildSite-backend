import { createNewUser } from "../services/createNewUser";
import { generateCrypto } from "../services/generateCrypto";
import { sendConfirmationMail } from "../services/sendEmail";
import type { RequestHandler } from "express";
import { validateRegister } from "../services/userValidation";
import type { ZodError } from "zod";
import { insertActivationCode } from "../services/databaseServices/insertActivationCode";

export const userRegisterController: RequestHandler = async (
  req,
  res,
  _next
) => {
  const validatedSchema = await validateRegister(req.body);
  if (!validatedSchema[0]) {
    const authCode = await generateCrypto();
    const instanceOfInsert = await insertActivationCode(authCode);
    if (instanceOfInsert) {
      const authCodeId = instanceOfInsert.get("authCodeId");
      const userAccountCreateMessage = await createNewUser(req, authCodeId);
      await sendConfirmationMail(req.body.email, authCode);
      res.status(201).send({ message: userAccountCreateMessage });
    }
  } else {
    const errors = validatedSchema.map((error: ZodError) => error.message);
    res.status(403).send({ errors });
  }
};
export const userLogoutController: RequestHandler = (req, res, _next) => {
  req.logout();
  req.session = undefined;
  res.clearCookie("connect.sid");
  res.status(200).json({ message: "Successful logout" });
};
