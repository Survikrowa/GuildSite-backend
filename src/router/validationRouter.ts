import { Router } from "express";
import { codeValidationController } from "../controller/codeValidationController";

export const validationRouter = Router();

validationRouter.post("/:activationCode", codeValidationController);
