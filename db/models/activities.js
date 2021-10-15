'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  activities.init({
    activities_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    activities_date: DataTypes.DATE,
    activities_title: DataTypes.STRING,
    activities_detail: DataTypes.TEXT,
    activities_image: DataTypes.STRING,
    activities_keyword: DataTypes.TEXT,
    is_slide: DataTypes.INTEGER,
    date_created: DataTypes.DATE,
    date_update: DataTypes.DATE,
    status_active: DataTypes.INTEGER,
    is_deleted: DataTypes.INTEGER,
    ip: DataTypes.STRING
  },{
    sequelize,
    modelName: 'activities',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return activities;
};