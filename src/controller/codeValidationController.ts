import type { RequestHandler } from "express";
import { updateUserAuthStatus } from "../services/databaseServices/updateUserAuthStatus";
import { findCodeInDb } from "../services/databaseServices/findCodeInDb";

export const codeValidationController: RequestHandler = async (
  req,
  res,
  _next
) => {
  const { activationCode } = req.params;
  const foundCode = await findCodeInDb(activationCode);
  if (foundCode) {
    const authCodeId = foundCode.get("authCodeId");
    if (authCodeId) {
      const isUserAuthenticated = await updateUserAuthStatus(authCodeId);
      if (isUserAuthenticated) {
        res.status(200).json({ message: "User authenticated successfully" });
      } else {
        res.status(409).json({ message: "User is actually authenticated" });
      }
    }
  } else {
    res.status(400).json({ message: "Provided auth code is wrong" });
  }
};
