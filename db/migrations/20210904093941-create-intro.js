'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Intros', {
     
      intro_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      intro_title: {
        type: Sequelize.STRING
      },
      intro_url: {
        type: Sequelize.STRING
      },
      intro_btn: {
        type: Sequelize.STRING
      },
      intro_date_s: {
        type: Sequelize.DATE
      },
      intro_date_e: {
        type: Sequelize.DATE
      },
      intro_image: {
        type: Sequelize.STRING
      },
      is_has_bless: {
        type: Sequelize.INTEGER
      },
      is_admin: {
        type: Sequelize.INTEGER
      },
      is_use: {
        type: Sequelize.INTEGER
      },
      ip: {
        type: Sequelize.STRING
      },
      is_deleted: {
        type: Sequelize.INTEGER
      },
      date_created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      date_updated: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Intros');
  }
};