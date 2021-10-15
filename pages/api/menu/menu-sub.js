import nextConnect from 'next-connect';

const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import moment from 'moment';
import { absoluteUrl, checkIsLogin, getIPAddress, convertDatetoAddDB } from '../../../middleware/utils';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
   
  })
  .post(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const {
      menu_id,
      menu_title,
      menu_detail,
      menu_seq,
      is_show,
      is_pattern_menu,
      pattern_menu,
    } = body;
    //SampleText.replace("Developer", "App Builder");
    const dataMenu = {
      menu_id: menu_id,
      menu_title: menu_title,
      menu_detail: menu_detail,
      menu_seq: menu_seq,
      is_show: is_show,
      is_pattern_menu: is_pattern_menu,
      pattern_menu: pattern_menu,
    };

    if (
      menu_id == undefined ||
      menu_title == undefined || menu_detail == undefined ||
      menu_seq == undefined ||
      is_show == undefined || 
      is_pattern_menu == undefined || pattern_menu == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataMenu: dataMenu
      });
    }
    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataMenu.ip = ip
    dataMenu.is_deleted = 0
    dataMenu.date_created = currentDate.replace("+07:00", "+00:00")
    dataMenu.date_updated = currentDate.replace("+07:00", "+00:00")


    // console.log(dataIntro)
    const newMenu = await models.Menu_sub.create(dataMenu);

    if (newMenu == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'บันทึกข้อมูลสำเร็จ',
    });
  });
 
  

export default handler;
