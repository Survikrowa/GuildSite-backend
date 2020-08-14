import { findUserByEmail, findUserByUsername } from "../models/user";

import * as zod from "zod";

const registerSchema = zod.object({
  username: zod
    .string()
    .min(8, { message: "Username must be at least 8 chars long" }),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 chars long" }),
  email: zod.string().email({ message: "Invalid email address" }),
});

export const validateRegister = async ({ username, password, email }: data) => {
  try {
    registerSchema.parse({ username, password, email });
    const usernameFound = await findUserByUsername(username);
    const emailFound = await findUserByEmail(email);
    if (usernameFound || emailFound) {
      throw [{ message: "Username or email already taken" }];
    }
    return true;
  } catch (e) {
    if (e instanceof zod.ZodError) {
      return e.errors;
    } else {
      return e;
    }
  }
};

interface data {
  username: string;
  password: string;
  email: string;
}
