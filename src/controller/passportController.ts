import type { RequestHandler } from "express";
import passport from "passport";

export const localPassportController: RequestHandler = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info.message });
    } else {
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.status(200).json({ Status: 200, Redirect: true });
      });
    }
  })(req, res, next);
};
export const facebookPassportController: RequestHandler = (req, res, next) => {
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    successRedirect: "/account",
  })(req, res, next);
};
