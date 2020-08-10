import { Router } from "express";
import passport from "passport";

import { v2 } from "cloudinary";

import { userController } from "../controller/user";
import { logoutUser } from "../controller/userLogout";

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const userRouter = Router();

userRouter.post("/", userController);
userRouter.post("/login", passport.authenticate("local"));
userRouter.get("/logout", logoutUser);
