'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('poll_answers', {
      poll_answer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      poll_option_id: {
        type: Sequelize.INTEGER
      },
      stat_os: {
        type: Sequelize.STRING
      },
      stat_browser: {
        type: Sequelize.STRING
      },
      stat_user_agent: {
        type: Sequelize.STRING
      },
      poll_name: {
        type: Sequelize.STRING
      },
      pull_poersonid: {
        type: Sequelize.STRING
      },
      date_created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      ip: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('poll_answers');
  }
};