import type { RequestHandler } from "express";
import { updateUserAuthStatus } from "../services/databaseServices/updateUserAuthStatus";
import { findCodeInDb } from "../services/databaseServices/findCodeInDb";
import { isUserNotAuthenticated } from "../helpers/isUserAuthenticated";

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
      const instance = await updateUserAuthStatus(authCodeId);
      console.log(isUserNotAuthenticated(instance));
      if (isUserNotAuthenticated(instance)) {
        res
          .status(200)
          .json({
            message: "User authenticated successfully. You can now log in!",
          });
      } else {
        res.status(409).json({ message: "User is actually authenticated." });
      }
    }
  } else {
    res.status(400).json({ message: "Provided auth code is wrong." });
  }
};
