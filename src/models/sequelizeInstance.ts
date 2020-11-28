import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  <string>process.env.DATABASE_URL
);
