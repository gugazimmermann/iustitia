"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: "9a7accd1-ce26-4420-987e-26901277009d",
          name: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "122da9dd-66be-48ad-98d4-e6c3872a6735",
          name: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
