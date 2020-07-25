import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { createUser } from "../models/user";
const SALT_ROUNDS = 10;

export const createNewUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    bcrypt.hash(req.body.password, SALT_ROUNDS, async (err, hash) => {
      if (!err) {
        await createUser({
          username: req.body.username,
          password: hash,
          eMail: req.body.email,
        });
        res.status(201).send({
          message: "Account has been created!",
          status: 203,
          redirect: true,
        });
        next();
      } else {
        return;
      }
    });
  } else {
    const errorsMessages = errors.array().map((error) => error.msg);
    res.status(403).send({ errors: errorsMessages });
  }
};
