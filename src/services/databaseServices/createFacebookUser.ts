import { User } from "../../models/user";

export const createFacebookUser = ({
  username,
  password,
  email,
}: Partial<User>) => {
  return User.create({
    username,
    password,
    email,
  });
};
