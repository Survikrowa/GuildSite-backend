import type { RequestHandler } from "express";
import { updateUserAuthStatus } from "../services/databaseServices/updateUserAuthStatus";
import { findCodeInDb } from "../services/databaseServices/findCodeInDb";

export const codeValidationController: RequestHandler = async (
  req,
  res,
  next
) => {
  const { activationCode } = req.params;
  const foundCode = await findCodeInDb(activationCode);
  if (!foundCode) {
    res.status(400).json({ message: "Provided auth code is wrong" });
  } else {
    const authCodeId = foundCode.get("authCodeId");
    if (authCodeId) {
      const userUpdateStatus = await updateUserAuthStatus(authCodeId);
      if (userUpdateStatus) {
        res.status(200).json({ message: "User authenticated successfully" });
      } else {
        res.status(409).json({ message: "User is actually authenticated" });
      }
    }
  }
  next();
};
