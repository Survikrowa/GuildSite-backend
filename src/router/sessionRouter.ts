import { Router } from "express";
import { sessionController } from "../controller/sessionController";
import { routerErrorHandler } from "../services/routerErrorHandler";
import {
  getGuildApplication,
  postGuildApplication,
} from "../controller/guildApplicationsController";

export const sessionRouter = Router();

sessionRouter.get("/me", routerErrorHandler(sessionController));
sessionRouter.get("/me/application", routerErrorHandler(getGuildApplication));
sessionRouter.post("/me/application", routerErrorHandler(postGuildApplication));
