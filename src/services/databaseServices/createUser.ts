import { User } from "../../models/user";

export const createUser = (
  { username, password, email }: Partial<User>,
  authCodeId?: number
) => {
  return User.create({
    username,
    password,
    email,
    authCodeId,
  });
};
