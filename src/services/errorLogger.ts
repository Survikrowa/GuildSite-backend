import { createLogger, format, transports } from "winston";
import path from "path";

export const logger = createLogger({
  level: "info",
  format: format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({
      filename: path.join(__dirname, "/error.log"),
      level: "error",
    }),
    new transports.File({ filename: path.join(__dirname, "combined.log") }),
  ],
});
