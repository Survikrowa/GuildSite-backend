import { Router } from "express";

import { userRegisterValidation } from "../services/userValidation";
import { createNewUser } from "../controller/createNewUser";

export const userRouter = Router();

userRouter.post("/register", userRegisterValidation, createNewUser);
