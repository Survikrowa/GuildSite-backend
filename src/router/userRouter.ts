import { Router } from "express";
import passport from "passport";
import { userController } from "../controller/user";
import { logoutUser } from "../controller/userLogout";

export const userRouter = Router();

userRouter.post("/", userController);
userRouter.post("/login", passport.authenticate("local"));
userRouter.get("/logout", logoutUser);
