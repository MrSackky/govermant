'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class poll_answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  poll_answer.init({
    poll_answer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    poll_option_id: DataTypes.INTEGER,
    stat_os: DataTypes.STRING,
    stat_browser: DataTypes.STRING,
    stat_user_agent: DataTypes.STRING,
    poll_name: DataTypes.STRING,
    pull_poersonid: DataTypes.STRING,
    date_created: DataTypes.DATE,
    ip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'poll_answer',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return poll_answer;
};