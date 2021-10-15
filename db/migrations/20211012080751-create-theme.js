'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('themes', {
      theme_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      theme_code: {
        type: Sequelize.STRING
      },
      theme_title: {
        type: Sequelize.INTEGER
      },
      theme_path: {
        type: Sequelize.STRING
      },
      is_used: {
        type: Sequelize.INTEGER
      },
      is_custom: {
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('themes');
  }
};
