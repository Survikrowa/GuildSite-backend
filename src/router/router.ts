import { Router } from "express";
import { userRouter } from "./userRouter";
import { validationRouter } from "./validationRouter";
import { sessionRouter } from "./sessionRouter";
import { passportRouter } from "./passportRouter";

export const router = Router();

router.use("/users", userRouter);
router.use("/requestVerificationCode", validationRouter);
router.use("/session", sessionRouter);
router.use("/auth", passportRouter);
