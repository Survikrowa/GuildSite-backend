import type { RequestHandler } from "express";
import { findUserApplicationsBy } from "../services/databaseServices/findUserApplicationsBy";
import { insertGuildApplication } from "../services/databaseServices/insertGuildApplication";

export const getGuildApplication: RequestHandler = async (req, res, _next) => {
  //@ts-ignore
  const user = req.user?.id;

  const response = await findUserApplicationsBy({ userId: user });
  if (response) {
    const guildApplication = response.get("guildApplication");
    res.status(200).json({ guildApplication });
  } else {
    res.status(400).json({ error: "There is no user with provided username" });
  }
};

export const postGuildApplication: RequestHandler = async (req, res, _next) => {
  //@ts-ignore
  const userId = req?.user.id;
  if (userId) {
    const response = await findUserApplicationsBy({ userId });
    if (response) {
      res.status(401).json({ error: "User already applied" });
    } else {
      await insertGuildApplication(req.body, userId);
      res.status(201).json({ info: "Successfuly applied!" });
    }
  } else {
    res.status(401).json({ error: "User not authorized" });
  }
};
