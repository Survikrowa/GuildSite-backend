import crypto from "crypto";

export const generateAuthCode: authCode = () => {
  return crypto.randomBytes(16).toString("hex");
};

type authCode = () => string;
