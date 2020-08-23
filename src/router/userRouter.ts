import { Router } from "express";
import { userController } from "../controller/user";
import { logoutUser } from "../controller/userLogout";
import { authPassportController } from "../controller/authPassport";

export const userRouter = Router();

userRouter.post("/", userController);
userRouter.post("/login", authPassportController);
userRouter.post("/logout", logoutUser);
