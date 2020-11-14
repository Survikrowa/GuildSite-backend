import { GuildApplications } from "../../models/guildApplications";

type GuildApplcation = {
  igName: string;
  userDescription: string;
  age: string;
  mainAndAlts: string;
  prevExp: string;
  raidDays: string;
  uiScreen: string;
  whereDidUFindUs: string;
  prefRaidLang: string;
  applicationState: string;
};

export const insertGuildApplication = (
  guildApplication: GuildApplcation,
  userId: string
) => {
  return GuildApplications.create({
    ...guildApplication,
    userId,
  });
};
