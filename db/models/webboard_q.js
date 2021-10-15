'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class webboard_qs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  webboard_qs.init({
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    question_title: DataTypes.STRING,
    question_detail: DataTypes.TEXT,
    question_post: DataTypes.STRING,
    question_personid: DataTypes.STRING,
    is_show_personid: DataTypes.INTEGER,
    is_approve: DataTypes.INTEGER,
    approve_date: DataTypes.DATE,
    date_question_date: DataTypes.DATE,
    question_view: DataTypes.INTEGER,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'webboard_qs',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return webboard_qs;
};