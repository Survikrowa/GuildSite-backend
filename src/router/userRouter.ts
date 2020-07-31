import { Router } from "express";

import { userController } from "../controller/user";

export const userRouter = Router();

userRouter.post("/", userController);
