import type { RequestHandler } from "express";
import { ZodError } from "zod";
import { findAllGuildApplicationsBy } from "../services/databaseServices/findAllGuildApplicationsBy";
import { findUserApplicationsBy } from "../services/databaseServices/findUserApplicationsBy";
import { insertGuildApplication } from "../services/databaseServices/insertGuildApplication";
import { hasErrors, parseGuildApplication } from "../services/dataParser";
import { guildRanks } from "../constants/guildRanks";
import { updateApplicationStatus } from "../services/databaseServices/updateApplicationStatus";

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

export const getGuildApplication: RequestHandler = async (req, res, _next) => {
  //@ts-ignore
  const userId = req.user?.id;
  if (userId) {
    const response = await findUserApplicationsBy({ userId: userId });
    if (response) {
      const guildApplication = response.get();
      const {
        age,
        applicationState,
        igName,
        mainAndAlts,
        prefRaidLang,
        prevExp,
        raidDays,
        uiScreen,
        whereDidUFindUs,
        userDescription,
      } = guildApplication as GuildApplcation;
      res.status(200).json({
        age,
        applicationState,
        igName,
        mainAndAlts,
        prefRaidLang,
        prevExp,
        raidDays,
        uiScreen,
        whereDidUFindUs,
        userDescription,
      });
    } else {
      res
        .status(400)
        .json({ message: "There is no user with provided username" });
    }
  } else {
    res.status(401).json({ message: "User not authorized" });
  }
};

export const postGuildApplication: RequestHandler = async (req, res, _next) => {
  //@ts-ignore
  const userId = req?.user.id;
  if (userId) {
    const response = await findUserApplicationsBy({ userId });
    if (response) {
      res.status(409).json({ error: "User already applied" });
    } else {
      const parseResult = await parseGuildApplication(req.body);
      if (hasErrors(parseResult)) {
        const { errors } = parseResult;
        const errorMessage = errors.map((error: ZodError) => error.message);
        res.status(403).json({ errorMessage });
      } else {
        const { data } = parseResult;
        if (data) {
          await insertGuildApplication(data, userId);
          res.status(201).json({ info: "Successfuly applied!" });
        }
      }
    }
  } else {
    res.status(401).json({ error: "User not authorized" });
  }
};

export const getAllApplications: RequestHandler = async (req, res, _next) => {
  //@ts-ignore
  const userRank = req?.user.userRank;
  if (userRank) {
    if (userRank === guildRanks.GRUZIN || userRank === guildRanks.ADMIN) {
      const response = await findAllGuildApplicationsBy();
      if (response) {
        res.status(200).json({ response });
      }
    } else {
      res.status(401).json({ error: "User not authorized" });
    }
  } else {
    res.status(401).json({ error: "User not authorized" });
  }
};

export const getSingleApplication: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  //@ts-ignore
  const userRank = req?.user.userRank;
  if (
    (userRank && userRank === guildRanks.GRUZIN) ||
    userRank === guildRanks.ADMIN
  ) {
    const response = await findUserApplicationsBy({ userId: userId });
    if (response) {
      const guildApplication = response.get();
      console.log(response, guildApplication);
      const {
        age,
        applicationState,
        igName,
        mainAndAlts,
        prefRaidLang,
        prevExp,
        raidDays,
        uiScreen,
        whereDidUFindUs,
        userDescription,
      } = guildApplication as GuildApplcation;
      res.status(200).json({
        age,
        applicationState,
        igName,
        mainAndAlts,
        prefRaidLang,
        prevExp,
        raidDays,
        uiScreen,
        whereDidUFindUs,
        userDescription,
      });
    }
  } else {
    res.status(401).json({ message: "User not authorized" });
  }
};

export const updateGuildApplicationStatus: RequestHandler = async (
  req,
  res
) => {
  //@ts-ignore
  const userRank = req?.user.userRank;
  const { userId } = req.params;
  const { status } = req.body;
  if (
    (userRank && userRank === guildRanks.ADMIN) ||
    userRank === guildRanks.GRUZIN
  ) {
    await updateApplicationStatus({ userId, status });

    res.status(204).json({ message: "Updated successfully" });
  } else {
    res.status(401).json({ message: "User not authorized" });
  }
};
