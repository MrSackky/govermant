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
    */
     return queryInterface.bulkInsert('tender_types', [
      {
        tender_type_id: 1,
        tendet_type_name: 'ตกลงราคา',
        status_active: 1,
        is_deleted: 0
      },{
        tender_type_id: 2,
        tendet_type_name: 'สอบราคา',
        status_active: 1,
        is_deleted: 0
      },{
        tender_type_id: 3,
        tendet_type_name: 'วิธีประกาศเชิญชวนทั่วไป',
        status_active: 1,
        is_deleted: 0
      },{
        tender_type_id: 4,
        tendet_type_name: 'วิธีตลาดอิเล็กทรอนิกส์',
        status_active: 1,
        is_deleted: 0
      },{
        tender_type_id: 5,
        tendet_type_name: 'วิธีประกวดราคาอิเล็กทรอนิกส์',
        status_active: 1,
        is_deleted: 0
      },{
        tender_type_id: 6,
        tendet_type_name: 'วิธีสอบราคา',
        status_active: 1,
        is_deleted: 0
      },{
        tender_type_id: 7,
        tendet_type_name: 'วิธีคัดเลือก',
        status_active: 1,
        is_deleted: 0
      },{
        tender_type_id: 8,
        tendet_type_name: 'วิธีเฉพาะเจาะจง',
        status_active: 1,
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
     return queryInterface.bulkDelete('tender_types', null, {});
  }
};
