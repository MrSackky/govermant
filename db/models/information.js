'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  information.init({
    infor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    infor_date: DataTypes.DATE,
    infor_title: DataTypes.STRING,
    infor_detail: DataTypes.TEXT,
    infor_image: DataTypes.STRING,
    infor_keyword: DataTypes.TEXT,
    infor_view: DataTypes.INTEGER,
    date_created: DataTypes.DATE,
    date_update: DataTypes.DATE,
    status_active: DataTypes.INTEGER,
    is_deleted: DataTypes.INTEGER,
    ip: DataTypes.STRING
  },{
    sequelize,
    modelName: 'information',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return information;
};