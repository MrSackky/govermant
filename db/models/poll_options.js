'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class poll_options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      poll_options.belongsTo(models.poll_questions, { foreignKey: 'poll_questions_id', as: 'poll_questions' });

    }
  };
  poll_options.init({
    poll_option_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    poll_questions_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'poll_questions',
        key: 'poll_questions_id'
      },
    },
    poll_options_name: DataTypes.STRING,
    poll_options_score: DataTypes.INTEGER,
    poll_option_total_score: DataTypes.INTEGER,
    is_deleted: DataTypes.INTEGER,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    ip: DataTypes.STRING,
    poll_questions_seq: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'poll_options',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return poll_options;
};
