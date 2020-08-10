import bodyParser from "body-parser";
import express from "express";
import Session from "express-session";
import CookieParser from "cookie-parser";
import { router } from "./router/router";
import { checkDB, findUserByUsername } from "./models/user";
import passport from "passport";
import { strategy } from "./services/passportLocalStrategy";
import { User } from "./models/user";

const app = express();
const port = 3000;

passport.use(strategy);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  Session({
    secret: <string>process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(CookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser<User, string>((user, done) => {
  done(null, user.username);
});

passport.deserializeUser<string, string>(async (username, done) => {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
});

app.use("/api", router);

app.listen(port, checkDB);
