import { Router } from "express";
import { userController } from "../controller/user";
import { logoutUser } from "../controller/userLogout";
import { authPassportController } from "../controller/authPassport";
import passport from "passport";

export const userRouter = Router();

userRouter.post("/", userController);
userRouter.post(
  "/login",
  passport.authenticate("local"),
  authPassportController
);
userRouter.get("/logout", logoutUser);
