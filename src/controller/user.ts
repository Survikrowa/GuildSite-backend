import { validateUserData } from "../services/userValidation";
import { createNewUser } from "../services/createNewUser";
import type { RequestHandler } from "express";

export const userController: RequestHandler = async (req, res, next) => {
  const validatedData = await validateUserData(req);
  if (validatedData.isEmpty()) {
    const userAccountCreateMessage = await createNewUser(req);
    res.status(201).send(userAccountCreateMessage);
    next();
  } else {
    const errorsMessages = validatedData.array().map((error) => error.msg);
    res.status(403).send({ errors: errorsMessages });
    next();
  }
};
