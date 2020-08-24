import crypto from "crypto";

export const generateCrypto: authCode = async () => {
  return crypto.randomBytes(16).toString("hex");
};

type authCode = () => Promise<string>;
