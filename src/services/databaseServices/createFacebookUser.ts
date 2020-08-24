import { User } from "../../models/user";
import { logger } from "../errorLogger";

export const createFacebookUser = async ({
  username,
  password,
  email,
}: Partial<User>) => {
  try {
    return await User.create({
      username,
      password,
      email,
    });
  } catch (error) {
    logger.error(error);
    return;
  }
};
