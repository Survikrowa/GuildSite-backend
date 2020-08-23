import type { RequestHandler } from "express";
import passport from "passport";

export const facebookPassportController: RequestHandler = (req, res, next) => {
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    successRedirect: "/account",
  })(req, res, next);
};
