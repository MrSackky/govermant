'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('journals', {
      journal_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      journal_subject: {
        type: Sequelize.STRING
      },
      journal_detail: {
        type: Sequelize.TEXT
      },
      journal_file: {
        type: Sequelize.STRING
      },
      journal_ori: {
        type: Sequelize.STRING
      },
      is_show: {
        type: Sequelize.INTEGER
      },
      journal_img: {
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
      date_update: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      is_deleted: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('journals');
  }
};