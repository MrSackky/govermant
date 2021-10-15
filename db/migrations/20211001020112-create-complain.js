'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('complains', {
      complain_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      complain_name_posted: {
        type: Sequelize.STRING
      },
      complain_post: {
        type: Sequelize.STRING
      },
      complain_detail: {
        type: Sequelize.TEXT
      },
      complain_phone: {
        type: Sequelize.STRING
      },
      complain_email: {
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
    await queryInterface.dropTable('complains');
  }
};
