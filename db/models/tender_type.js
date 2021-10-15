'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tender_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tender_type.init({
    tender_type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    tendet_type_name: DataTypes.STRING,
    status_active: DataTypes.INTEGER('1'),
    is_deleted: DataTypes.INTEGER('1')
  }, {
    sequelize,
    modelName: 'tender_type',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return tender_type;
};