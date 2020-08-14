import { Model, DataTypes, NOW } from "sequelize";
import { sequelize } from "./sequelizeInstance";

class ActivationCodes extends Model {
  public authCodeId!: number;
  public activationCode!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ActivationCodes.init(
  {
    authCodeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    activationCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
    },
  },
  {
    tableName: "activationCodes",
    sequelize,
  }
);

export const insertActivationCode = async (activationCode: string) => {
  try {
    return ActivationCodes.create({
      activationCode,
    });
  } catch (error) {
    return error;
  }
};

export const findCodeInDb = async (activationCode: string) => {
  try {
    return ActivationCodes.findOne({
      where: {
        activationCode,
      },
    });
  } catch (error) {
    return error;
  }
};
