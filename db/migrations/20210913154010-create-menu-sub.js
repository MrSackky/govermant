'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Menu_sub', {
      menu_sub_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menu_id: {
        type: Sequelize.INTEGER
      },
      menu_title: {
        type: Sequelize.STRING
      },
      menu_detail: {
        type: Sequelize.TEXT
      },
      menu_seq: {
        type: Sequelize.INTEGER
      },
      is_show: {
        type: Sequelize.INTEGER
      },
      ip: {
        type: Sequelize.STRING
      },
      date_created: {
        type: Sequelize.DATE
      },
      date_updated: {
        type: Sequelize.DATE
      },
      is_deleted: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Menu_sub');
  }
};