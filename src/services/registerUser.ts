import bcrypt from "bcrypt";
import { createUser } from "./databaseServices/createUser";
import { SALT_ROUNDS } from "../constants/bcrypt";

export const registerUser = async (
  { username, password, email }: userCredentials,
  authCodeId: number
) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  await createUser(
    {
      username,
      password: hashedPassword,
      email,
    },
    authCodeId
  );
  return {
    message: "Account has been created!",
  };
};

interface userCredentials {
  username: string;
  password: string;
  email: string;
}
