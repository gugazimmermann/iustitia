'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "places",
      [
        {
          id: "099330a1-ddb2-402b-8560-a95848b69033",
          name: "JR Advocacia",
          email: "contato@jr.adv.br",
          phone: "(47) 98870-4247",
          zip: "88.301-000",
          address: "Rua Hercílio Luz",
          number: "10",
          complement: null,
          neighborhood: "Centro",
          city: "Itajaí",
          state: "SC",
          active: true,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a699fc50-6fd1-417d-90ee-fdd18a800527",
          name: "Place Test Inactive",
          email: null,
          phone: null,
          zip: "88.303-000",
          address: "Rua Brusque",
          number: null,
          complement: null,
          neighborhood: "Centro",
          city: "Itajaí",
          state: "SC",
          active: false,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("places", null, {});
  }
};
