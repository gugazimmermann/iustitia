'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "persons",
      [
        {
          id: "b5bb4789-e609-4923-918b-2207aa61e8ea",
          type: "Contatos",
          avatar: null,
          name: "Contact Test 1",
          email: "teste@teste.com",
          phone: "(47) 99999-9999",
          zip: "88303-040",
          address: "Rua Almirante Barroso",
          number: "459",
          complement: null,
          neighborhood: "Centro",
          city: "Itajai",
          state: "SC",
          comments: null,
          position: null,
          companyId: null,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a134551a-528f-4154-a916-5d0749377fee",
          type: "Contatos",
          avatar: null,
          name: "Contact Test 2",
          email: "teste@teste.com",
          phone: "(47) 99999-9999",
          zip: "88303-040",
          address: "Rua Almirante Barroso",
          number: "459",
          complement: null,
          neighborhood: "Centro",
          city: "Itajai",
          state: "SC",
          comments: "Proin nec finibus mauris. Etiam sollicitudin nisl non sapien tempus lobortis.",
          position: "CTO",
          companyId: "a7f307fe-84ed-41c2-8295-9150919d68b1",
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "57b7c8f7-4bc7-42b7-9124-f38ce1402033",
          type: "Contatos",
          avatar: null,
          name: "Contact Test 3",
          email: "teste@teste.com",
          phone: "(47) 99999-9999",
          zip: "88303-040",
          address: "Rua Almirante Barroso",
          number: "459",
          complement: null,
          neighborhood: "Centro",
          city: "Itajai",
          state: "SC",
          comments: null,
          position: null,
          companyId: null,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "70183427-d5e4-4a1e-97ba-ee434403bb80",
          type: "Contatos",
          avatar: null,
          name: "Contact Test 4",
          email: "teste@teste.com",
          phone: "(47) 99999-9999",
          zip: "88303-040",
          address: "Rua Almirante Barroso",
          number: "459",
          complement: null,
          neighborhood: "Centro",
          city: "Itajai",
          state: "SC",
          comments: null,
          position: null,
          companyId: null,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c2d40490-e098-404b-9e90-f333f9d14121",
          type: "Clientes",
          avatar: null,
          name: "Client Test 1",
          email: "teste@teste.com",
          phone: "(47) 99999-9999",
          zip: "88303-040",
          address: "Rua Almirante Barroso",
          number: "459",
          complement: null,
          neighborhood: "Centro",
          city: "Itajai",
          state: "SC",
          comments: null,
          position: null,
          companyId: null,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d3e2320d-2da8-44ff-8cc7-65be5a2a5d63",
          type: "Clientes",
          avatar: null,
          name: "Client Test 2",
          email: "teste@teste.com",
          phone: "(47) 99999-9999",
          zip: "88303-040",
          address: "Rua Almirante Barroso",
          number: "459",
          complement: null,
          neighborhood: "Centro",
          city: "Itajai",
          state: "SC",
          comments: null,
          position: null,
          companyId: null,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e59e2b6b-a6c6-48db-8620-d97acd49b6c0",
          type: "Clientes",
          avatar: null,
          name: "Client Test 3",
          email: "teste@teste.com",
          phone: "(47) 99999-9999",
          zip: "88303-040",
          address: "Rua Almirante Barroso",
          number: "459",
          complement: null,
          neighborhood: "Centro",
          city: "Itajai",
          state: "SC",
          comments: null,
          position: null,
          companyId: null,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4e8c09c1-8f7b-417c-8ac4-69ed3e3f3feb",
          type: "Fornecedores",
          avatar: null,
          name: "Supplier Test 1",
          email: "teste@teste.com",
          phone: "(47) 99999-9999",
          zip: "88303-040",
          address: "Rua Almirante Barroso",
          number: "459",
          complement: null,
          neighborhood: "Centro",
          city: "Itajai",
          state: "SC",
          comments: null,
          position: null,
          companyId: null,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "03d0a69f-4000-4519-99d8-c564cf40acaf",
          type: "Fornecedores",
          avatar: null,
          name: "Supplier Test 2",
          email: "teste@teste.com",
          phone: "(47) 99999-9999",
          zip: "88303-040",
          address: "Rua Almirante Barroso",
          number: "459",
          complement: null,
          neighborhood: "Centro",
          city: "Itajai",
          state: "SC",
          comments: null,
          position: null,
          companyId: null,
          tenantId: "fd6bc51e-195e-4433-b404-8a9fdfa0f632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("persons", null, {});
  }
};

