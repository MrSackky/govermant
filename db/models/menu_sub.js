'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu_sub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu_sub.belongsTo(models.Menu, { foreignKey: 'menu_id', as: 'menu' });

    }
  };
  Menu_sub.init({
    menu_sub_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    menu_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Menu',
        key: 'menu_id'
      },
    },
    menu_title: DataTypes.STRING,
    menu_detail: DataTypes.TEXT,
    menu_seq: DataTypes.INTEGER,
    is_show: DataTypes.INTEGER,
    is_pattern_menu: DataTypes.INTEGER,
    pattern_menu: DataTypes.INTEGER,
    ip: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu_sub',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
    tableName: 'Menu_sub'
  });
  return Menu_sub;
};