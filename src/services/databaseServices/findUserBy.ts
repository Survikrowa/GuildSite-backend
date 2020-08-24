import { logger } from "../errorLogger";
import { User } from "../../models/user";

export const findUserBy = async (conditions: Record<string, string>) => {
  try {
    return User.findOne({
      where: conditions,
    });
  } catch (error) {
    logger.error(error);
    return;
  }
};
