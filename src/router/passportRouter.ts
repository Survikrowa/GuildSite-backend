import { Router } from "express";
import passport from "passport";
import { facebookPassportController } from "../controller/facebookPassport";

export const passportRouter = Router();

passportRouter.get(
  `/facebook`,
  passport.authenticate("facebook", { scope: ["email"] })
);
passportRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (_req, res) => {
    res.redirect("http://localhost:3000/home");
  }
);
