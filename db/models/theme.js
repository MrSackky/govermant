'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class theme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  theme.init({
    theme_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    theme_code: DataTypes.STRING,
    theme_title: DataTypes.INTEGER,
    theme_path: DataTypes.STRING,
    is_used: DataTypes.INTEGER,
    is_custom: DataTypes.INTEGER,
    organization_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'theme',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
  });
  return theme;
};
