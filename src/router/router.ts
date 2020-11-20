import { Router } from "express";
import { userRouter } from "./userRouter";
import { validationRouter } from "./validationRouter";
import { sessionRouter } from "./sessionRouter";
import { passportRouter } from "./passportRouter";
import { guildApplicationRouter } from "./guildApplicationRouter";

export const router = Router();

router.use("/users", userRouter);
router.use("/requestVerificationCode", validationRouter);
router.use("/session", sessionRouter);
router.use("/auth", passportRouter);
router.use("/applications", guildApplicationRouter);
