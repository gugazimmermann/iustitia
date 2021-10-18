"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "profiles",
      [
        {
          id: "45a2d648-f814-49f7-8024-51512ec9b512",
          avatar:
            "fd6bc51e195e4433b4048a9fdfa0f632/fd6bc51e195e4433b4048a9fdfa0f63221584694.jpeg",
          name: "Guga",
          email: "gugazimmermann@gmail.com",
          phone: "(47) 98870-4247",
          zip: "88.304-070",
          address: "Rua Benjamin Franklin Pereira",
          number: "410",
          complement: "apt 705",
          neighborhood: "São João",
          city: "Itajaí",
          state: "SC",
          userId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "62efdbc7-2926-48cd-9c14-61c7eac2e47e",
          avatar: null,
          name: "user Touch Sistemas",
          email: "contato@touchsistemas.com.br",
          phone: null,
          zip: null,
          address: null,
          number: null,
          complement: null,
          neighborhood: null,
          city: null,
          state: null,
          userId: "4e573fa5-00b3-45cf-bdf5-c88ddf8cbabe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ee56f5c0-a3bb-479c-9cc8-e2d05acd4e3b",
          avatar: null,
          name: "user Pocz",
          email: "guga@pocz.io",
          phone: null,
          zip: null,
          address: null,
          number: null,
          complement: null,
          neighborhood: null,
          city: null,
          state: null,
          userId: "a5109879-c5c0-48d2-9f9b-f17450b89c7d",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("profiles", null, {});
  },
};
