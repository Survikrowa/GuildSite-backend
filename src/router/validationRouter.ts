import { Router } from "express";
import { codeValidationController } from "../controller/codeValidation";

export const validationRouter = Router();

validationRouter.post("/:activationCode", codeValidationController);
