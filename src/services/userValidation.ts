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
    return registerSchema.parse({ username, password, email });
  } catch (e) {
    if (e instanceof zod.ZodError) {
      return e.errors;
    } else {
      return e;
    }
  }
};

export const parseUserLoginCredentials = async ({
  username,
  password,
}: loginData) => {
  try {
    return loginSchema.parse({ username, password });
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
