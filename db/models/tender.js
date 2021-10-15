'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tender.init({
    tender_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    tender_date: DataTypes.DATE,
    type_tender_id: DataTypes.INTEGER,
    tender_title: DataTypes.STRING,
    tender_detail: DataTypes.TEXT,
    tender_keyword: DataTypes.TEXT,
    expire_date: DataTypes.DATE,
    date_created: DataTypes.DATE,
    date_update: DataTypes.DATE,
    status_active: DataTypes.INTEGER,
    is_deleted: DataTypes.INTEGER,
    ip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tender',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return tender;
};