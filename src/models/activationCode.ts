import { Sequelize, Model, DataTypes, NOW } from "sequelize";

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_IP}/${process.env.DB_NAME}`
);

class activationCodes extends Model {
  public authCodeId!: number;
  public activationCode!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

activationCodes.init(
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
    return activationCodes.create({
      activationCode,
    });
  } catch (error) {
    return error;
  }
};

export const findCodeInDb = async (activationCode: string) => {
  try {
    return activationCodes.findOne({
      where: {
        activationCode,
      },
    });
  } catch (error) {
    return error;
  }
};
