import type { RequestHandler } from "express";
import passport from "passport";

export const authPassportController: RequestHandler = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info.message });
    } else {
      req.logIn(user, (err) => {
        if (err) return next(err);
      });
      return res.status(200).json({ Status: 201, Redirect: true });
    }
  })(req, res, next);
};
