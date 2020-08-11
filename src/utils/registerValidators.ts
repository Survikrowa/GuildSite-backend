import { body } from "express-validator";
import { isUsernameTaken, isEmailTaken } from "./validationFunctions";

export const validators = [
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
