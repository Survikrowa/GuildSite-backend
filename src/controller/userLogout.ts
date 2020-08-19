import type { RequestHandler } from "express";

export const logoutUser: RequestHandler = (req, res, _next) => {
  req.logout();
  req.session = undefined;
  res.clearCookie("connect.sid");
  res.status(200).json({ message: "Successful logout" });
};