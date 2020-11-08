import type { RequestHandler } from "express";
import passport from "passport";

export const localPassportController: RequestHandler = (req, res, next) => {
  return new Promise((_resolve, reject) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return reject(err);
      if (!user) return res.status(401).json({ message: info.message });
      req.logIn(user, (err) => {
        if (err) return reject(err);
        return res.status(200).json({ Status: 200, Redirect: true });
      });
    })(req, res, next);
  });
};
