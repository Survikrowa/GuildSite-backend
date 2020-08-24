import { User } from "../../models/user";
import { Op } from "sequelize";

export const findUserBy = (conditions: Record<string, string>) => {
  console.log(conditions);
  return User.findOne({
    where: {
      [Op.or]: [conditions],
    },
  });
};
