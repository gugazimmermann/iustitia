'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "place_managers",
      [
        {
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          placeId: "099330a1-ddb2-402b-8560-a95848b69033",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("place_managers", null, {});
  }
};
