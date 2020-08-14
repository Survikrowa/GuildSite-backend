import { Strategy as LocalStrategy } from "passport-local";
import { findUserByUsername } from "../models/user";
import bcrypt from "bcrypt";
import { validateLoginData } from "./userValidation";
import { ZodError } from "zod";

export const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    const validatedSchema = validateLoginData({ username, password });
    if (!validatedSchema[0]) {
      const user = await findUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Invalid username or password" });
      } else {
        const hashedPassword = user.get("password");
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid username or password" });
        }
      }
    } else {
      const errors = validatedSchema.map((error: ZodError) => error.message);
      return done(null, false, { message: errors });
    }
  } catch (e) {
    return done(e);
  }
});
