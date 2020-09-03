import type { RequestHandler } from "express";

export const sessionController: RequestHandler = (req, res, _next) => {
  res.json(req.user);
};
