import { Model, DataTypes, NOW } from "sequelize";
import { sequelize } from "./sequelizeInstance";
import { guildApplicationState } from "../constants/guildApplicationStates";

export class GuildApplications extends Model {
  public id!: number;
  public igName!: string;
  public userDescription!: string;
  public age!: string;
  public mainAndAlts!: string;
  public prevExp!: string;
  public raidDays!: string;
  public uiScreen!: string;
  public whereDidUFindUs!: string;
  public prefRaidLang!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public applicationState!: string;
}

GuildApplications.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    igName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mainAndAlts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prevExp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raidDays: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uiScreen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whereDidUFindUs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prefRaidLang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicationState: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: guildApplicationState.NEW,
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "guildApplications",
    modelName: "guildApplications",
    sequelize: sequelize,
  }
);
