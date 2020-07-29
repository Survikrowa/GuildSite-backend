import { body, validationResult } from "express-validator";
import type { Request } from "express";
import { findUserByUsername, findUserByEmail } from "../models/user";

const isUsernameTaken = async (value: string) => {
  const foundUser = await findUserByUsername(value);
  if (!foundUser) {
    return Promise.resolve("Success");
  } else {
    return Promise.reject("Username already in use");
  }
};

const isEmailTaken = async (value: string) => {
  const foundUser = await findUserByEmail(value);
  if (!foundUser) {
    return Promise.resolve("Success");
  } else {
    return Promise.reject("Email already in use");
  }
};

export const validateUserData = async (req: Request) => {
  const validators = [
    body("username")
      .exists({ checkNull: true })
      .bail()
      .withMessage("There is no provided value for username")
      .isString()
      .bail()
      .withMessage("Provided value must be a string")
      .isLength({ min: 8 })
      .bail()
      .withMessage("Username must be at least 8 chars long")
      .custom((value) => isUsernameTaken(value))
      .bail()
      .withMessage("Username already in use"),
    body("password")
      .exists({ checkNull: true })
      .bail()
      .withMessage("There is no provided value for password")
      .isLength({ min: 8 })
      .bail()
      .withMessage("Password must be at least 8 chars long ")
      .isString()
      .bail()
      .withMessage("Provided value must be a string"),
    body("email")
      .exists({ checkNull: true })
      .bail()
      .withMessage("There is no provided value for email")
      .isEmail()
      .withMessage("Provided value is not an Email")
      .bail()
      .custom((value) => isEmailTaken(value))
      .withMessage("Email already in use"),
  ];
  await Promise.all(validators.map((validator) => validator.run(req)));
  return validationResult(req);
};
