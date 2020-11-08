"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({guildApplications}) {
      this.hasOne(guildApplications, {foreignKey: "userId"})
    }
  }
  User.init(
    {
      id: DataTypes.NUMBER,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      userRank: DataTypes.STRING,
      userAvatar: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      authenticated: DataTypes.BOOLEAN,
      authCodeId: DataTypes.NUMBER,
    },
    {
      tableName: "users",
      modelName: "users",
      sequelize: sequelize,
    }
  );
  return User;
};
