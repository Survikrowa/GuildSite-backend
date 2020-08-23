import { Strategy as FacebookStrategy } from "passport-facebook";
import type { VerifyFunction } from "passport-facebook";
import { createUser, findUserBy } from "../models/user";
import { generateAuthCode } from "./generateAuthCode";
import { insertActivationCode } from "../models/activationCode";

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
  const username = profile.displayName;
  const user = await findUserBy({ username });
  if (user) return done(null, user);
  if (profile?.emails) {
    const authCode = await generateAuthCode();
    const instanceOfInsert = await insertActivationCode(authCode);
    if (instanceOfInsert) {
      const authCodeId = instanceOfInsert.get("authCodeId");
      const createdUser = await createUser(
        {
          username: profile.displayName,
          password: "facebook",
          email: profile?.emails[0].value,
        },
        authCodeId
      );
      return done(null, createdUser);
    } else {
      return done("Database error", false);
    }
  } else {
    return done("There is no provided email", false);
  }
};

export const strategy = new FacebookStrategy(strategyOptions, verifyCallback);
