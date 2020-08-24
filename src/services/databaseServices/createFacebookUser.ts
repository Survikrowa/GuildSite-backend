import { User } from "../../models/user";

export const createFacebookUser = ({
  username,
  password,
  email,
}: Partial<User>) => {
  try {
    return User.create({
      username,
      password,
      email,
    });
  } catch (error) {
    throw new Error(error);
  }
};
