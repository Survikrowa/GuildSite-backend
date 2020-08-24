import * as zod from "zod";
import { findUserBy } from "./databaseServices/findUserBy";

const registerSchema = zod.object({
  username: zod
    .string()
    .min(8, { message: "Username must be at least 8 chars long" }),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 chars long" }),
  email: zod.string().email({ message: "Invalid email address" }),
});

const loginSchema = zod.object({
  username: zod
    .string()
    .min(8, { message: "Username must be at least 8 chars long" }),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 chars long" }),
});

export const validateRegister = async ({
  username,
  password,
  email,
}: registerData) => {
  try {
    registerSchema.parse({ username, password, email });
    const usernameFound = await findUserBy({ username });
    const emailFound = await findUserBy({ email });
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

export const validateLoginData = ({ username, password }: loginData) => {
  try {
    loginSchema.parse({ username, password });
    return true;
  } catch (e) {
    return e.errors;
  }
};

interface registerData {
  username: string;
  password: string;
  email: string;
}

interface loginData {
  username: string;
  password: string;
}
