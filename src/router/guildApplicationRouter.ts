import { Router } from "express";
import {
  getAllApplications,
  getSingleApplication,
  updateGuildApplicationStatus,
} from "../controller/guildApplicationsController";
import { routerErrorHandler } from "../services/routerErrorHandler";

export const guildApplicationRouter = Router();

guildApplicationRouter.get("/", routerErrorHandler(getAllApplications));
guildApplicationRouter.get(
  "/:userId",
  routerErrorHandler(getSingleApplication)
);
guildApplicationRouter.put(
  "/:userId",
  routerErrorHandler(updateGuildApplicationStatus)
);
