import { Router } from "express";
import { codeValidationController } from "../controller/codeValidationController";
import { routerErrorHandler } from "../services/routerErrorHandler";

export const validationRouter = Router();

validationRouter.post(
  "/:activationCode",
  routerErrorHandler(codeValidationController)
);
