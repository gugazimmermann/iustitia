'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "creditcards",
      [
        {
          id: "60d79d73-9d11-4c8a-a6fe-382f29cdfacb",
          name: "APRO",
          firstSixDigits: "503143",
          lastFourDigits: "6351",
          expirationMonth: "11",
          expirationYear: "2025",
          status: true,
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("creditcards", null, {});
  }
};
