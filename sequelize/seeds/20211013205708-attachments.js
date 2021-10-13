'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "attachments",
      [
        {
          id: "608b5e5c-d8c7-4f49-ae17-9368c1b1f1ef",
          name: "02 - A New Level.mp3",
          link: "fd6bc51e-195e-4433-b404-8a9fdfa0f632/attachments/c2d40490e098404b9e90f333f9d14121/02 - A New Level.mp3_175636214",
          ownerId: "c2d40490-e098-404b-9e90-f333f9d14121",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ef4f16b9-72da-4318-a836-80fca49b3c2d",
          name: "AlbumArt_{BB14CE3F-F85F-47B3-8C47-408026498FE5}_Large.jpg",
          link: "fd6bc51e-195e-4433-b404-8a9fdfa0f632/attachments/c2d40490e098404b9e90f333f9d14121/AlbumArt_{BB14CE3F-F85F-47B3-8C47-408026498FE5}_Large.jpg_175638675",
          ownerId: "c2d40490-e098-404b-9e90-f333f9d14121",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "449067b2-2d25-4844-b85e-6d9c6899bb50",
          name: "Informações.txt",
          link: "fd6bc51e-195e-4433-b404-8a9fdfa0f632/attachments/c2d40490e098404b9e90f333f9d14121/Informações.txt_175639454",
          ownerId: "c2d40490-e098-404b-9e90-f333f9d14121",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("attachments", null, {});
  }
};
