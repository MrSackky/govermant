'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pattern_menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pattern_menu.init({
    pattern_menu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    pattern_title: DataTypes.STRING,
    is_show: DataTypes.INTEGER,
    ip: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pattern_menu',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false, 
    tableName: 'Pattern_menu'
  });
  return Pattern_menu;
};