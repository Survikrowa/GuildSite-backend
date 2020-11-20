import type { RequestHandler } from "express";

export const sessionController: RequestHandler = (req, res, _next) => {
  //@ts-ignore
  const { username, userRank, userAvatar, email, id } = req.user;
  res.json({ username, userRank, userAvatar, email, id });
};
