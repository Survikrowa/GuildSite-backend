import { GuildApplications } from "../../models/guildApplications";

export const findAllGuildApplicationsBy = (
  conditions?: Record<string, string>
) => {
  if (conditions) {
    const findBy = Object.entries(conditions).map(([key, item]) => {
      return { [key]: item };
    });
    return GuildApplications.findAll({
      where: { findBy },
    });
  } else {
    return GuildApplications.findAll();
  }
};
