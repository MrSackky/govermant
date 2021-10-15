'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('webboard_qs', {
      question_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_id: {
        type: Sequelize.INTEGER
      },
      question_title: {
        type: Sequelize.STRING
      },
      question_detail: {
        type: Sequelize.TEXT
      },
      question_post: {
        type: Sequelize.STRING
      },
      question_personid: {
        type: Sequelize.STRING
      },
      is_show_personid: {
        type: Sequelize.INTEGER
      },
      is_approve: {
        type: Sequelize.INTEGER
      },
      approve_date: {
        type: Sequelize.DATE
      },
      date_question_date: {
        type: Sequelize.DATE
      },
      question_view: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('webboard_qs');
  }
};