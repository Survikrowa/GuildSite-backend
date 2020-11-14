import * as zod from "zod";
import { ZodError } from "zod/lib/src/ZodError";

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

export const parseUserRegisterCredentials = async ({
  username,
  password,
  email,
}: registerData) => {
  try {
    return {
      data: registerSchema.parse({ username, password, email }),
    };
  } catch (e) {
    return { errors: e.errors };
  }
};

export const parseUserLoginCredentials = async ({
  username,
  password,
}: loginData) => {
  try {
    return {
      data: loginSchema.parse({ username, password }),
    };
  } catch (e) {
    return { errors: e.errors };
  }
};

export const hasErrors = (parseResult: parseResult) => {
  return "errors" in parseResult;
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

interface parseResult {
  username?: string;
  password?: string;
  email?: string;
  errors?: ZodError;
}
