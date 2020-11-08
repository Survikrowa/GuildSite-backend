"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class activationCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  activationCodes.init(
    {
      authCodeId: DataTypes.NUMBER,
      activationCode: DataTypes.STRING,
    },
    {
      sequelize: sequelize,
      tableName: "activationCodes",
      modelName: "activationCodes",
    }
  );
  return activationCodes;
};
