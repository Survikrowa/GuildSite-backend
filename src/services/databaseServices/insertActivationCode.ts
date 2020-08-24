import { logger } from "../errorLogger";
import { ActivationCodes } from "../../models/activationCode";

export const insertActivationCode = async (activationCode: string) => {
  try {
    return ActivationCodes.create({
      activationCode,
    });
  } catch (error) {
    logger.log({ level: "error", message: error });
    return;
  }
};
