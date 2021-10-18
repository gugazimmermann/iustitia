'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "place_supliers",
      [
        {
          personId: "03d0a69f-4000-4519-99d8-c564cf40acaf",
          placeId: "099330a1-ddb2-402b-8560-a95848b69033",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("place_supliers", null, {});
  }
};
