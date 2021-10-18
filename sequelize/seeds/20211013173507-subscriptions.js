"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "subscriptions",
      [
        {
          id: "458a4fbf-beae-4311-a2f9-81a77aad4adf",
          reason: "Iustitia Profissional Mensal",
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 99.9,
          status: true,
          type: "professional",
          planId: "6e104032-211e-4e10-8eb8-325ecdeb6bcd",
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c463f80e-eb21-4b06-a6f0-af78b595a9c0",
          reason: "Iustitia Profissional Mensal",
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 99.9,
          status: true,
          type: "professional",
          planId: "6e104032-211e-4e10-8eb8-325ecdeb6bcd",
          userId: "4e573fa5-00b3-45cf-bdf5-c88ddf8cbabe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "fdcd1092-77e1-4bcd-b291-314878622d3d",
          reason: "Iustitia Profissional Mensal",
          frequency: 1,
          frequencyType: "months",
          transactionAmount: 99.9,
          status: true,
          type: "professional",
          planId: "6e104032-211e-4e10-8eb8-325ecdeb6bcd",
          userId: "a5109879-c5c0-48d2-9f9b-f17450b89c7d",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("subscriptions", null, {});
  },
};
