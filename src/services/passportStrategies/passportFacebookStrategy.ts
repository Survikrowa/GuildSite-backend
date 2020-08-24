import { Strategy as FacebookStrategy } from "passport-facebook";
import type { VerifyFunction } from "passport-facebook";
import { generateCrypto } from "../generateCrypto";
import { findUserBy } from "../databaseServices/findUserBy";
import { createFacebookUser } from "../databaseServices/createFacebookUser";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../constants/bcrypt";

const strategyOptions = {
  clientID: <string>process.env.FACEBOOK_ID,
  clientSecret: <string>process.env.FACEBOOK_SECRET,
  callbackURL: <string>process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ["displayName", "emails"],
};

const verifyCallback: VerifyFunction = async (
  _accessToken,
  _refreshToken,
  profile,
  done
) => {
  if (profile?.emails) {
    const username = profile.displayName;
    const email = profile?.emails[0].value;
    const user = await findUserBy({ email });
    if (user) return done(null, user);
    const crypto = await generateCrypto();
    const password = await bcrypt.hash(crypto, SALT_ROUNDS);
    const createdUser = await createFacebookUser({
      username,
      password,
      email,
    });
    return done(null, createdUser);
  } else {
    return done("There is no provided email", false);
  }
};

export const strategy = new FacebookStrategy(strategyOptions, verifyCallback);
