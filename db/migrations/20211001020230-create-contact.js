'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacts', {
      contact_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      contact_name_posted: {
        type: Sequelize.STRING
      },
      contact_post: {
        type: Sequelize.STRING
      },
      contact_detail: {
        type: Sequelize.TEXT
      },
      contact_telephone: {
        type: Sequelize.STRING
      },
      contact_email: {
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
      ip: {
        type: Sequelize.STRING
      },
      personid: {
        type: Sequelize.STRING
      },
      is_done: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contacts');
  }
};
