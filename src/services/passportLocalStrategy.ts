import { Strategy as LocalStrategy } from "passport-local";
import { findUserByUsername } from "../models/user";
import bcrypt from "bcrypt";

export const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    //todo: add validation for login data
    const user = await findUserByUsername(username);
    if (!user) {
      return done(null, false, { message: "Invalid username" });
    } else {
      const hashedPassword = user.get("password");
      const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invalid password" });
      }
    }
  } catch (e) {
    return done(e);
  }
});
