import { User } from "../../models/user";
import { logger } from "../errorLogger";

export const createUser = async (
  { username, password, email }: Partial<User>,
  authCodeId?: number
) => {
  try {
    return await User.create({
      username,
      password,
      email,
      authCodeId,
    });
  } catch (error) {
    logger.error(error);
    return;
  }
};
