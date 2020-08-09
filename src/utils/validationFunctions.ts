import { findUserByEmail, findUserByUsername } from "../models/user";

export const isUsernameTaken = async (value: string) => {
  const foundUser = await findUserByUsername(value);
  if (!foundUser) {
    return Promise.resolve("Success");
  } else {
    return Promise.reject("Username already in use");
  }
};

export const isEmailTaken = async (value: string) => {
  const foundUser = await findUserByEmail(value);
  if (!foundUser) {
    return Promise.resolve("Success");
  } else {
    return Promise.reject("Email already in use");
  }
};
