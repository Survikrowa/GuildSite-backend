import { GuildApplications } from "../../models/guildApplications";

type UpdateProps = {
  userId: string;
  status: string;
};

export const updateApplicationStatus = ({ userId, status }: UpdateProps) => {
  return GuildApplications.update(
    {
      applicationState: status,
    },
    {
      where: {
        userId: userId,
      },
    }
  );
};
