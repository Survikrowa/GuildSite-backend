import type { RequestHandler } from "express";
import passport from "passport";

export const authPassportController: RequestHandler = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
  })(req, res, next);
};
