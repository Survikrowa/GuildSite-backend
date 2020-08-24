import type { Request } from "express";
import bcrypt from "bcrypt";
import { createUser } from "./databaseServices/createUser";

const SALT_ROUNDS = 10;

export const createNewUser = async (req: Request, authCodeId: number) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  await createUser(
    {
      username,
      password: hashedPassword,
      email,
    },
    authCodeId
  );
  return {
    message: "Account has been created!",
    status: 203,
    redirect: true,
  };
};
