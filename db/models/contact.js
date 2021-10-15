'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  contact.init({
    contact_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    contact_name_posted: DataTypes.STRING,
    contact_post: DataTypes.STRING,
    contact_detail: DataTypes.TEXT,
    contact_telephone: DataTypes.STRING,
    contact_email: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    ip: DataTypes.STRING,
    personid: DataTypes.STRING,
    is_done: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'contact',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return contact;
};
