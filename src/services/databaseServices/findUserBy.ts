import { User } from "../../models/user";
import { Op } from "sequelize";

export const findUserBy = (conditions: Record<string, string>) => {
  const arr = [];
  for (const [key, value] of Object.entries(conditions)) {
    arr.push({ [key]: value });
  }
  return User.findOne({
    where: {
      [Op.or]: arr,
    },
  });
};
