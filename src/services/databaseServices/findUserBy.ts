import { User } from "../../models/user";

export const findUserBy = async (conditions: Record<string, string>) => {
  return User.findOne({
    where: conditions,
  });
};
