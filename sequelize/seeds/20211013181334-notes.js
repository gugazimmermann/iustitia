'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "notes",
      [
        {
          id: "aabd66ce-4c4c-4ef0-915a-15d0c1f4ba6f",
          title: "Lorem ipsum dolor sit amet",
          content: `Consectetur adipiscing elit. Vestibulum a convallis nisl. Nunc ut odio at diam fermentum facilisis non laoreet urna. Quisque aliquet, mi quis commodo blandit, nunc diam facilisis quam, blandit lacinia risus magna in purus.

          Proin a orci varius, efficitur enim eget, lobortis est. Nullam vitae aliquam arcu. Duis tincidunt justo at enim vestibulum tempor.

          Fusce id justo in mi pellentesque egestas id eget ante.`,
          ownerId: "c2d40490-e098-404b-9e90-f333f9d14121",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("notes", null, {});
  }
};
