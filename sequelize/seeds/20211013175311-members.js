'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "members",
      [
        {
          id: "2c8d0893-642f-4c45-89fd-49ab9e15f72a",
          name: "Guerrilla User",
          email: "guga@grr.la",
          code: 651685,
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("members", null, {});
  }
};

