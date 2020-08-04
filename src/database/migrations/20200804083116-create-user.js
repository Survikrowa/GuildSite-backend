"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("mzg_backend", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      userRank: {
        type: Sequelize.STRING,
      },
      userAvatar: {
        type: Sequelize.STRING,
      },
      authenticated: {
        type: Sequelize.BOOLEAN,
      },
      authCodeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "activationCodes",
          key: "authCodeId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("mzg_backend");
  },
};
