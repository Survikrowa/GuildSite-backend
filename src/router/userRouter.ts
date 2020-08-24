import { Router } from "express";
import {
  userLogoutController,
  userRegisterController,
} from "../controller/userController";
import { localPassportController } from "../controller/passportController";

export const userRouter = Router();

userRouter.post("/", userRegisterController);
userRouter.post("/login", localPassportController);
userRouter.post("/logout", userLogoutController);
