import log4js from "log4js";

log4js.configure({
  appenders: { cheese: { type: "file", filename: "error.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});

export const logger = log4js.getLogger("cheese");
