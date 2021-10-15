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
    const {
      method,
      body,
    } = req;
    const { organization_id = 0 } = req.query;
    let _search = {
      is_show: 1,
      is_deleted: 0
    };

    // console.log(_search)
    const _menu = await models.Pattern_menu.findAndCountAll({
      // attributes: ['package_id','code_package','name_package','size_limit'] 
      where: _search,
      // offset: results * (page - 1),
      // limit: parseInt(results),
      order: [
        ["pattern_menu_id", "ASC"]
      ]
    });
    return res.status(200).json({
      // info: {
      //   page: page,
      //   results: results
      // },
      results: _menu.rows,
      totalCount: _menu.count
    });
  })
  .post(async (req, res) => {
    // const { body } = req;
    // const { slug } = req.query;
    // const {
    //   organization_id,
    //   menu_title,
    //   menu_detail,
    //   menu_seq,
    //   have_sub,
    //   is_show,
    //   is_primary_menu,
    //   is_pattern_menu,
    //   pattern_menu,
    // } = body;
    // //SampleText.replace("Developer", "App Builder");
    // const dataMenu = {
    //   organization_id: organization_id,
    //   menu_title: menu_title,
    //   menu_detail: menu_detail,
    //   menu_seq: menu_seq,
    //   have_sub: have_sub,
    //   is_show: is_show,
    //   is_primary_menu: is_primary_menu,
    //   is_pattern_menu: is_pattern_menu,
    //   pattern_menu: pattern_menu,
    // };

    // if (
    //   organization_id == undefined ||
    //   menu_title == undefined || menu_detail == undefined ||
    //   menu_seq == undefined || have_sub == undefined ||
    //   is_show == undefined || is_primary_menu == undefined ||
    //   is_pattern_menu == undefined || pattern_menu == undefined
    // ) {
    //   return res.status(200).json({
    //     status: 201,
    //     message: 'data incorrect',
    //     dataMenu: dataMenu
    //   });
    // }
    // var ip = await getIPAddress()
    // var currentDate = moment().format()
    // dataIntro.ip = ip
    // dataIntro.is_deleted = 0
    // dataIntro.date_created = currentDate.replace("+07:00", "+00:00")
    // dataIntro.date_updated = currentDate.replace("+07:00", "+00:00")


    // // console.log(dataIntro)
    // const newMenu = await models.Menu.create(dataMenu);

    // if (newMenu == null) {
    //   return res.status(500).json({
    //     status: 500,
    //     message: 'Internal error',
    //   });
    // }
    // return res.status(200).json({
    //   status: 200,
    //   message: 'บันทึกข้อมูลสำเร็จ',
    // });
  });

export default handler;
