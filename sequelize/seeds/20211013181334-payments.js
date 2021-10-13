'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "payments",
      [
        {
          id: "617877c8-43c7-4ae5-b4d0-e977ee3b2f56",
          transactionAmount: 99.9,
          status: "Paid",
          paidDate: "2021-10-09 06:10:54",
          subscriptionId: "458a4fbf-beae-4311-a2f9-81a77aad4adf",
          creditcardId: "60d79d73-9d11-4c8a-a6fe-382f29cdfacb",
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5c699501-b08f-458d-b127-f7aaac0ef745",
          transactionAmount: 99.9,
          status: "Paid",
          paidDate: "2021-09-09 06:10:54",
          subscriptionId: "458a4fbf-beae-4311-a2f9-81a77aad4adf",
          creditcardId: "60d79d73-9d11-4c8a-a6fe-382f29cdfacb",
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3452da1c-6538-4b7c-a18a-b3c0e99cb978",
          transactionAmount: 99.9,
          status: "Paid",
          paidDate: "2021-08-09 06:10:54",
          subscriptionId: "458a4fbf-beae-4311-a2f9-81a77aad4adf",
          creditcardId: "60d79d73-9d11-4c8a-a6fe-382f29cdfacb",
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("payments", null, {});
  }
};

