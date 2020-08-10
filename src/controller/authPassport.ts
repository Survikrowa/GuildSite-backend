import type { RequestHandler } from "express";

export const authPassportController: RequestHandler = (_req, res, next) => {
  res.status(203).json({ message: "Success!" });
  next();
};
