'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          email: "gugazimmermann@gmail.com",
          password: "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a5109879-c5c0-48d2-9f9b-f17450b89c7d",
          email: "guga@pocz.io",
          password: "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4e573fa5-00b3-45cf-bdf5-c88ddf8cbabe",
          email: "contato@touchsistemas.com.br",
          password: "$2a$08$dCn.6v4n1Q2P0JRb5Edr9u9FbkcCQjNpWNHymjlGIeTYpzYo74OQe",
          tenant: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  }
};
