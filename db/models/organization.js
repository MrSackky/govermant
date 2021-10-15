'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.belongsTo(models.Packages, { foreignKey: 'package', as: 'packages' });
      Organization.belongsTo(models.Sub_district, { foreignKey: 'organization_sub_district_id', as: 'sub_districts' });
      Organization.hasMany(models.Users, { foreignKey: 'organization_id', as: 'users' })

    }
  };
  Organization.init({
    organization_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    organization_name: DataTypes.STRING,
    organization_name_eng: DataTypes.STRING,
    organization_logo: DataTypes.STRING,
    organization_email: DataTypes.STRING,
    organization_email_alert: DataTypes.STRING,
    organization_address: DataTypes.STRING,
    organization_sub_district_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Sub_districts',
        key: 'sub_district_id'
      },
    },
    organization_phone: DataTypes.STRING,
    organization_fax: DataTypes.STRING,
    is_use: DataTypes.INTEGER,
    is_use_intro: DataTypes.INTEGER,
    is_poll_confirm: DataTypes.INTEGER,
    theme: DataTypes.INTEGER,
    person01_name: DataTypes.STRING,
    person01_position: DataTypes.STRING,
    person01_image: DataTypes.STRING,
    person01_phone: DataTypes.STRING,
    person02_name: DataTypes.STRING,
    person02_position: DataTypes.STRING,
    person02_image: DataTypes.STRING,
    person02_phone: DataTypes.STRING,
    person03_name: DataTypes.STRING,
    person03_position: DataTypes.STRING,
    person03_image: DataTypes.STRING,
    person03_phone: DataTypes.STRING,
    package: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Packages',
        key: 'package_id'
      },
    },
    thumbnail: DataTypes.STRING,
    thumbnail_link: DataTypes.STRING,
    thumbnail_url: DataTypes.STRING,
    show_index: DataTypes.INTEGER,
    google_verify: DataTypes.STRING,
    social_fb: DataTypes.STRING,
    social_fb_pageid: DataTypes.STRING,
    rss: DataTypes.STRING,
    google_tag_manager1: DataTypes.STRING,
    google_tag_manager2: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_expired: DataTypes.DATE,
    size_used: DataTypes.INTEGER,
    old_customer_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organization',
    timestamps: false,
    // I don't want createdAt
    createdAt: false,
    updatedAt: false,
    id: false,
    hooks: {
      beforeCreate: function (_Organization, options) {
        // Do stuff
        _Organization.thumbnail_url = _Organization.thumbnail_url
          .toLowerCase()
          .replace(/[^A-Za-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-');
      },
    },
  });

  // Organization.associate = function (models) {
  //   Organization.belongsTo(models.Packages, { foreignKey: 'package_id', as: "package_data" });

  // }
  // Organization.associate = (models) => { Organization.hasOne(models.Packages, { foreignKey: 'package', sourceKey: 'package_id' }); };
  // Organization.hasOne(models.Packages);
  return Organization;
};