import { User } from "../../models/user";

export const createUser = (
  { username, password, email }: Partial<User>,
  authCodeId?: number
) => {
  try {
    return User.create({
      username,
      password,
      email,
      authCodeId,
    });
  } catch (error) {
    throw new Error(error);
  }
};
