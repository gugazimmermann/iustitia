'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "place_employees",
      [
        {
          userId: "4e573fa5-00b3-45cf-bdf5-c88ddf8cbabe",
          placeId: "099330a1-ddb2-402b-8560-a95848b69033",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "a5109879-c5c0-48d2-9f9b-f17450b89c7d",
          placeId: "099330a1-ddb2-402b-8560-a95848b69033",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("place_employees", null, {});
  }
};
