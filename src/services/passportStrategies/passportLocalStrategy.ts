import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { hasErrors, parseUserLoginCredentials } from "../dataParser";
import type { ZodError } from "zod";
import { findUserBy } from "../databaseServices/findUserBy";

export const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    const parseResult = await parseUserLoginCredentials({
      username,
      password,
    });
    if (hasErrors(parseResult)) {
      const { errors } = parseResult;
      const errorMessage = errors.map((error: ZodError) => error.message);
      return done(null, false, { message: errorMessage });
    } else {
      if (parseResult.data) {
        const user = await findUserBy({
          username: parseResult.data.username,
        });
        if (!user) {
          return done(null, false, { message: "Invalid username or password" });
        } else if (!user.authenticated) {
          return done(null, false, { message: "Account is not authenticated" });
        } else {
          const hashedPassword = user.get("password");
          const isPasswordMatch = await bcrypt.compare(
            parseResult.data.password,
            hashedPassword
          );
          if (isPasswordMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Invalid username or password",
            });
          }
        }
      }
    }
  } catch (e) {
    return done(e);
  }
});
