import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { parseUserLoginCredentials } from "../userValidation";
import type { ZodError } from "zod";
import { findUserBy } from "../databaseServices/findUserBy";

export const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    const userCredentials = await parseUserLoginCredentials({
      username,
      password,
    });
    console.log({ username, password });
    if (userCredentials[0]) {
      const errors = userCredentials.map((error: ZodError) => error.message);
      return done(null, false, { message: errors });
    } else {
      const user = await findUserBy({ username: userCredentials.username });
      if (!user) {
        return done(null, false, { message: "Invalid username or password" });
      } else if (!user.authenticated) {
        return done(null, false, { message: "Account is not authenticated" });
      } else {
        const hashedPassword = user.get("password");
        const isPasswordMatch = await bcrypt.compare(
          userCredentials.password,
          hashedPassword
        );
        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid username or password" });
        }
      }
    }
  } catch (e) {
    return done(e);
  }
});
