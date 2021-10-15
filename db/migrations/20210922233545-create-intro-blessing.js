'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('intro_blessings', {
      intro_blessing_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      intro_id: {
        type: Sequelize.INTEGER
      },
      text_blessing: {
        type: Sequelize.TEXT
      },
      name_blessing: {
        type: Sequelize.STRING
      },
      position_blessing: {
        type: Sequelize.STRING
      },
      work_blessing: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      date_created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      date_updated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      is_deleted: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('intro_blessings');
  }
};