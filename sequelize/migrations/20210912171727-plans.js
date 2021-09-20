"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "plans",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          autoIncrement: false,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        preapprovalPlanId: { type: Sequelize.TEXT, allowNull: false },
        collectorId: { type: Sequelize.BIGINT, allowNull: true },
        applicationId: { type: Sequelize.BIGINT, allowNull: true },
        reason: { type: Sequelize.TEXT, allowNull: false },
        status: { type: Sequelize.TEXT, allowNull: false },
        initPoint: { type: Sequelize.TEXT, allowNull: true },
        frequency: { type: Sequelize.INTEGER, allowNull: false },
        frequencyType: { type: Sequelize.TEXT, allowNull: false },
        transactionAmount: { type: Sequelize.DOUBLE, allowNull: false },
        currencyId: { type: Sequelize.TEXT, allowNull: false },
        type: { type: Sequelize.TEXT, allowNull: false },
      },
      {
        paranoid: true,
        timestamps: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("plans");
  },
};
