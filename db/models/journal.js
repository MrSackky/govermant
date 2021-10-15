'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  journals.init({
    journal_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    journal_subject: DataTypes.STRING,
    journal_detail: DataTypes.TEXT,
    journal_file: DataTypes.STRING,
    journal_ori: DataTypes.STRING,
    is_show: DataTypes.INTEGER,
    journal_img: DataTypes.STRING,
    ip: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_update: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'journals',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return journals;
};