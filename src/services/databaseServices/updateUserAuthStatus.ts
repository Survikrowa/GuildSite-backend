import { Op } from "sequelize";
import { User } from "../../models/user";

export const updateUserAuthStatus = (authCodeId: number) => {
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
};
