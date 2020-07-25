import { body } from "express-validator";
import { findUserByUsername, findUserByEmail } from "../models/user";

const isUsernameTaken = async (value: string) => {
  if (await findUserByUsername(value)) {
    return Promise.reject("Username already in use");
  } else {
    return;
  }
};

const isEmailTaken = async (value: string) => {
  if (await findUserByEmail(value)) {
    return Promise.reject("Email already in use");
  } else {
    return;
  }
};

export const userRegisterValidation = [
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
