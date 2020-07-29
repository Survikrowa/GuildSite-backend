import type { Request } from "express";
import bcrypt from "bcrypt";
import { createUser } from "../models/user";
const SALT_ROUNDS = 10;

export const createNewUser = async (req: Request) => {
  await bcrypt.hash(req.body.password, SALT_ROUNDS, async (err, hash) => {
    if (!err) {
      await createUser({
        username: req.body.username,
        password: hash,
        eMail: req.body.email,
      });
      return {
        message: "Account has been created!",
        status: 203,
        redirect: true,
      };
    } else {
      return err;
    }
  });
};
