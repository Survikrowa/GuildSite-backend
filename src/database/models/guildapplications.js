'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class guildApplications extends Model {

    static associate({user}) {
      this.belongsTo(user, {foreignKey: "id"})
    }
  };
  guildApplications.init({
    igName: DataTypes.STRING,
    userDescription: DataTypes.STRING,
    age: DataTypes.STRING,
    mainAndAlts: DataTypes.STRING,
    prevExp: DataTypes.STRING,
    raidDays: DataTypes.STRING,
    uiScreen: DataTypes.STRING,
    whereDidUFindUs: DataTypes.STRING,
    prefRaidLang: DataTypes.STRING,
    cretedAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    applicationState: DataTypes.STRING,
  }, {
    sequelize: sequelize,
    modelName: 'guildApplications',
    tableName: 'guildApplications'
  });
  return guildApplications;
};