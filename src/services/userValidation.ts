import { body } from "express-validator";
import { findUserByUsername } from "../models/user";

const isUsernameTaken = async (value: string) => {
  if (await findUserByUsername(value)) {
    return Promise.reject("Username already in use");
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
    .custom((value) => isUsernameTaken(value))
    .bail()
    .withMessage("Username already in use"),
  body("password")
    .exists({ checkNull: true })
    .bail()
    .withMessage("There is no provided value for password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long ")
    .bail()
    .isString()
    .bail()
    .withMessage("Provided value must be a string"),
  body("email")
    .exists({ checkNull: true })
    .bail()
    .withMessage("There is no provided value for email")
    .isEmail()
    .withMessage("Provided value is not an Email")
    .bail(),
];
