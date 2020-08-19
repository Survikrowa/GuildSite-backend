import { Router } from "express";
import { sessionController } from "../controller/sessionController";

export const sessionRouter = Router();

sessionRouter.get("/me", sessionController);
