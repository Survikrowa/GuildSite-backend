import { Router } from "express";
import {
  userLogoutController,
  userRegisterController,
} from "../controller/userController";
import { localPassportController } from "../controller/passportController";
import { rotuerErrorHandler } from "../services/routerErrorHandler";

export const userRouter = Router();

userRouter.post("/", rotuerErrorHandler(userRegisterController));
userRouter.post("/login", rotuerErrorHandler(localPassportController));
userRouter.post("/logout", rotuerErrorHandler(userLogoutController));
