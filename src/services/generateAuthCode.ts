import crypto from "crypto";

export const generateAuthCode: authCode = async () => {
  return crypto.randomBytes(16).toString("hex");
};

type authCode = () => Promise<string>;
