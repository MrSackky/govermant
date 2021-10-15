'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * pattern_title: DataTypes.STRING,
    is_show: DataTypes.INTEGER,
    ip: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
    is_deleted: DataTypes.INTEGER
    {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    */
    return queryInterface.bulkInsert('Pattern_menu', [
      {
        pattern_title: "กำหนดเอง",
        is_show: 1,
        ip: 'manauly',
        date_created: Sequelize.literal('CURRENT_TIMESTAMP'),
        date_updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        is_deleted: 0
      }, {
        pattern_title: "ข่าวกิจกรรม",
        is_show: 1,
        ip: 'manauly',
        date_created: Sequelize.literal('CURRENT_TIMESTAMP'),
        date_updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        is_deleted: 0
      }, {
        pattern_title: "ข่าวประชาสัมพันธ์",
        is_show: 1,
        ip: 'manauly',
        date_created: Sequelize.literal('CURRENT_TIMESTAMP'),
        date_updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        is_deleted: 0
      }, {
        pattern_title: "ข่าวจัดซื้อจัดจ้าง",
        is_show: 1,
        ip: 'manauly',
        date_created: Sequelize.literal('CURRENT_TIMESTAMP'),
        date_updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        is_deleted: 0
      }, {
        pattern_title: "ลิงค์หน่วยงานที่เกี่ยวข้อง",
        is_show: 1,
        ip: 'manauly',
        date_created: Sequelize.literal('CURRENT_TIMESTAMP'),
        date_updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        is_deleted: 0
      }, {
        pattern_title: "กระดานข่าว",
        is_show: 1,
        ip: 'manauly',
        date_created: Sequelize.literal('CURRENT_TIMESTAMP'),
        date_updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        is_deleted: 0
      }, {
        pattern_title: "คลังเอกสาร",
        is_show: 1,
        ip: 'manauly',
        date_created: Sequelize.literal('CURRENT_TIMESTAMP'),
        date_updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        is_deleted: 0
      }, {
        pattern_title: "สำรวจความคิดเห็น",
        is_show: 1,
        ip: 'manauly',
        date_created: Sequelize.literal('CURRENT_TIMESTAMP'),
        date_updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        is_deleted: 0
      }, {
        pattern_title: "วารสาร",
        is_show: 1,
        ip: 'manauly',
        date_created: Sequelize.literal('CURRENT_TIMESTAMP'),
        date_updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        is_deleted: 0
      }, {
        pattern_title: "ร้องทุกข์",
        is_show: 1,
        ip: 'manauly',
        date_created: Sequelize.literal('CURRENT_TIMESTAMP'),
        date_updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        is_deleted: 0
      }, {
        pattern_title: "ติดต่อเรา",
        is_show: 1,
        ip: 'manauly',
        date_created: Sequelize.literal('CURRENT_TIMESTAMP'),
        date_updated: Sequelize.literal('CURRENT_TIMESTAMP'),
        is_deleted: 0
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
