'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "place_contacts",
      [
        {
          personId: "70183427-d5e4-4a1e-97ba-ee434403bb80",
          placeId: "099330a1-ddb2-402b-8560-a95848b69033",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("place_contacts", null, {});
  }
};
