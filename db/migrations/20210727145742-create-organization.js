'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Organizations', {
      organization_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organization_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      organization_name_eng: {
        type: Sequelize.STRING,
        allowNull: true
      },
      organization_logo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      organization_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_email_alert: {
        type: Sequelize.STRING,
        allowNull: true
      },
      organization_address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      organization_sub_district_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      organization_phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      organization_fax: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_use: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,

      },
      is_use_intro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      is_poll_confirm: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      theme: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      person01_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      person01_position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      person01_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      person01_phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      person02_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      person02_position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      person02_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      person02_phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      person03_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      person03_position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      person03_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      person03_phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      package: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      thumbnail_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      show_index: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      google_verify: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      social_fb: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      social_fb_pageid: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rss: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      google_tag_manager1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      google_tag_manager2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      date_expired: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      size_used: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      old_customer_id: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Organizations');
  }
};