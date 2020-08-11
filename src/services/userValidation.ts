import { validationResult } from "express-validator";
import type { Request } from "express";
import { validators } from "../utils/registerValidators";

export const validateUserData = async (req: Request) => {
  await Promise.all(validators.map((validator) => validator.run(req)));
  return validationResult(req);
};
