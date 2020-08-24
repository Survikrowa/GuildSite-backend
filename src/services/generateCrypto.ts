import crypto from "crypto";

export const generateCrypto = async () => {
  return crypto.randomBytes(16).toString("hex");
};
