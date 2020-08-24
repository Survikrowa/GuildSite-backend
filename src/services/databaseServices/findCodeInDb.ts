import { logger } from "../errorLogger";
import { ActivationCodes } from "../../models/activationCode";

export const findCodeInDb = async (activationCode: string) => {
  try {
    return ActivationCodes.findOne({
      where: {
        activationCode,
      },
    });
  } catch (error) {
    logger.log({ level: "error", message: error });
    return;
  }
};
