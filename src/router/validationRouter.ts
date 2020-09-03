import { Router } from "express";
import { codeValidationController } from "../controller/codeValidationController";
import { rotuerErrorHandler } from "../services/routerErrorHandler";

export const validationRouter = Router();

validationRouter.post(
  "/:activationCode",
  rotuerErrorHandler(codeValidationController)
);
