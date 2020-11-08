'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('guildApplications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      igName: {
        type: Sequelize.STRING
      },
      userDescription: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      mainAndAlts: {
        type: Sequelize.STRING
      },
      prevExp: {
        type: Sequelize.STRING
      },
      raidDays: {
        type: Sequelize.STRING
      },
      uiScreen: {
        type: Sequelize.STRING
      },
      whereDidUFindUs: {
        type: Sequelize.STRING
      },
      prefRaidLang: {
        type: Sequelize.STRING
      },
      applicationState: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('guildApplications');
  }
};