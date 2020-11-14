import { User } from "../../models/user";
import { Op } from "sequelize";

export const findUserBy = (conditions: Record<string, string>) => {
  const findBy = Object.entries(conditions).map(([key, item]) => {
    return { [key]: item };
  });
  return User.findOne({
    where: {
      [Op.or]: findBy,
    },
  });
};
