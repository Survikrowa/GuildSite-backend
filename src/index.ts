import bodyParser from "body-parser";
import express from "express";
import Session from "express-session";
import CookieParser from "cookie-parser";
import { router } from "./router/router";
import { checkDB } from "./models/user";
import passport from "passport";
import { strategy as LocalStrategy } from "./services/passportStrategies/passportLocalStrategy";
import { strategy as FacebookStrategy } from "./services/passportStrategies/passportFacebookStrategy";
import { User } from "./models/user";
import Cors from "cors";
import { findUserBy } from "./services/databaseServices/findUserBy";
const memoryStore = require("memorystore")(Session);
import {google} from 'googleapis';
const OAuth2 = google.auth.OAuth2

const app = express();
const port = process.env.PORT;

passport.use(LocalStrategy);
passport.use(FacebookStrategy);

app.use(
  Cors({
    origin: process.env.CROS_ORIGIN,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
export const myOAuth2Client = new OAuth2(process.env.GOOGLE_OAUTH_ID, process.env.GOOGLE_OAUTH_SECRET)
app.use(
  Session({
    secret: <string>process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: process.env.SESSION_DOMAIN,
    },
    store: new memoryStore({checkPeriod: 86400000})
  })
);
app.use(CookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser<User, string>((user, done) => {
  done(null, user.username);
});

passport.deserializeUser<User, string>(async (username, done) => {
  try {
    const user = await findUserBy({ username });
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
});


app.use("/api", router);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
