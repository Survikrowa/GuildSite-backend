import { ActivationCodes } from "../../models/activationCode";

export const insertActivationCode = (activationCode: string) => {
  return ActivationCodes.create({
    activationCode,
  });
};
