'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.hasMany(models.Menu_sub, { foreignKey: 'menu_id', as: 'menu_subs' })

    }
  };
  Menu.init({
    menu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_id: DataTypes.INTEGER,
    menu_title: DataTypes.STRING,
    menu_detail: DataTypes.TEXT,
    menu_seq: DataTypes.INTEGER,
    have_sub: DataTypes.INTEGER,
    is_show: DataTypes.INTEGER,
    is_primary_menu: DataTypes.INTEGER,
    is_pattern_menu: DataTypes.INTEGER,
    pattern_menu: DataTypes.INTEGER,
    ip: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
    tableName: 'Menu'
  });
  return Menu;
};