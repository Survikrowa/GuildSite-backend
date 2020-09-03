import { Router } from "express";
import { sessionController } from "../controller/sessionController";
import { rotuerErrorHandler } from "../services/routerErrorHandler";

export const sessionRouter = Router();

sessionRouter.get("/me", rotuerErrorHandler(sessionController));
