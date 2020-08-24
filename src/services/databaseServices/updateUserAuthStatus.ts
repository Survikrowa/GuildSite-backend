import { Op } from "sequelize";
import { logger } from "../errorLogger";
import { User } from "../../models/user";

export const updateUserAuthStatus = async (authCodeId: number) => {
  try {
    return User.update(
      {
        authenticated: true,
      },
      {
        where: {
          authCodeId,
          [Op.and]: {
            authenticated: false,
          },
        },
      }
    );
  } catch (error) {
    logger.error(error);
    return;
  }
};
