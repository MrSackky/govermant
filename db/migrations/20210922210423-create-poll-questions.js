'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('poll_questions', {
      poll_questions_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      poll_id: {
        type: Sequelize.INTEGER
      },
      poll_questions_title: {
        type: Sequelize.STRING
      },
      is_deleted: {
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
      ip: {
        type: Sequelize.STRING
      },
      poll_questions_seq: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('poll_questions');
  }
};