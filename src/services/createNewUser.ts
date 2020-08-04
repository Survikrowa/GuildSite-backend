import type { Request } from "express";
import bcrypt from "bcrypt";
import { createUser } from "../models/user";
const SALT_ROUNDS = 10;

export const createNewUser = async (req: Request, authCodeId: number) => {
  const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  await createUser(
    {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    },
    authCodeId
  );
  return {
    message: "Account has been created!",
    status: 203,
    redirect: true,
  };
};
