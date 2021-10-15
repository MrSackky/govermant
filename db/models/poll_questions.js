'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class poll_questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      poll_questions.hasMany(models.poll_options, { foreignKey: 'poll_questions_id', as: 'options' })
    }
  };
  poll_questions.init({
    poll_questions_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    poll_id: DataTypes.INTEGER,
    poll_questions_title: DataTypes.STRING,
    is_deleted: DataTypes.INTEGER,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    ip: DataTypes.STRING,
    poll_questions_seq: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'poll_questions',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return poll_questions;
};
