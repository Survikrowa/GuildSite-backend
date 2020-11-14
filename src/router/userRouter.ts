import { Router } from "express";
import {
  userLogoutController,
  userRegisterController,
} from "../controller/userController";
import { localPassportController } from "../controller/passportController";
import { routerErrorHandler } from "../services/routerErrorHandler";

export const userRouter = Router();

userRouter.post("/", routerErrorHandler(userRegisterController));
userRouter.post("/login", routerErrorHandler(localPassportController));
userRouter.post("/logout", routerErrorHandler(userLogoutController));
