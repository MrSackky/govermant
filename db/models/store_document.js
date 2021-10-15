'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store_documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  store_documents.init({
    file_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    file_name: DataTypes.STRING,
    file_name_ori: DataTypes.STRING,
    file_subject: DataTypes.STRING,
    file_url: DataTypes.STRING,
    is_show: DataTypes.INTEGER,
    download: DataTypes.INTEGER,
    ip: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_update: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'store_documents',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return store_documents;
};