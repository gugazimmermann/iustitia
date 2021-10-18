'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "user_roles",
      [
        {
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          roleId: "9a7accd1-ce26-4420-987e-26901277009d",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "4e573fa5-00b3-45cf-bdf5-c88ddf8cbabe",
          roleId: "122da9dd-66be-48ad-98d4-e6c3872a6735",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "a5109879-c5c0-48d2-9f9b-f17450b89c7d",
          roleId: "122da9dd-66be-48ad-98d4-e6c3872a6735",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_roles", null, {});
  }
};
