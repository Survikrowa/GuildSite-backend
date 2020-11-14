import { User } from "../../models/user";
import { Op } from "sequelize";
import { GuildApplications } from "../../models/guildApplications";

export const findUserApplicationsBy = (conditions: Record<string, string>) => {
  const findBy = Object.entries(conditions).map(([key, item]) => {
    return { [key]: item };
  });
  return GuildApplications.findOne({
    where: {
      [Op.or]: findBy,
    },
    include: [User],
  });
};
