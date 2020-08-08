import type { RequestHandler } from "express";
import { findCodeInDb } from "../models/activationCode";
import { updateUserAuthStatus } from "../models/user";

export const codeValidationController: RequestHandler = async (
  req,
  res,
  next
) => {
  const { activationCode } = req.params;
  const authCodeSelectResponse = await findCodeInDb(activationCode);
  if (authCodeSelectResponse) {
    const authCodeId = authCodeSelectResponse.get("authCodeId");
    const userUpdateStatus = await updateUserAuthStatus(authCodeId);
    if (userUpdateStatus[0]) {
      res.status(200).json({ message: "User authenticated successfully" });
    } else {
      res.status(409).json({ message: "User is actually authenticated" });
    }
    next();
  } else {
    res.status(400).json({ message: "Provided auth code is wrong" });
    next();
  }
};
