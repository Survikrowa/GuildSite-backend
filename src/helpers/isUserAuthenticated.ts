import { User } from "../models/user";

export const isUserNotAuthenticated = (
  sequelizeInsertInstance: [number, User[]]
) => {
  return Boolean(sequelizeInsertInstance[0]);
};
