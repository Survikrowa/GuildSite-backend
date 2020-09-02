import { ActivationCodes } from "../../models/activationCode";

export const findCodeInDb = (activationCode: string) => {
  return ActivationCodes.findOne({
    where: {
      activationCode,
    },
  });
};
