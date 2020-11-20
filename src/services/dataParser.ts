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

const guildApplicationSchema = zod.object({
  igName: zod.string().min(1, { message: "Field is required" }),
  userDescription: zod.string().min(1, { message: "Field is required" }),
  age: zod.string().min(1, { message: "Field is required" }),
  mainAndAlts: zod.string().min(1, { message: "Field is required" }),
  prevExp: zod.string().min(1, { message: "Field is required" }),
  raidDays: zod.string().min(1, { message: "Field is required" }),
  uiScreen: zod.string().min(1, { message: "Field is required" }),
  whereDidUFindUs: zod.string().min(1, { message: "Field is required" }),
  prefRaidLang: zod.string().min(1, { message: "Field is required" }),
});

export const parseGuildApplication = async (
  guildApplication: typeof guildApplicationSchema
) => {
  try {
    return {
      data: guildApplicationSchema.parse(guildApplication),
    };
  } catch (e) {
    return { errors: e.errors };
  }
};

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
