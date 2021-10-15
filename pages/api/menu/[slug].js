import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import { absoluteUrl, checkIsLogin, getIPAddress, convertDatetoAddDB } from '../../../middleware/utils';
import moment from 'moment';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {


  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const menu_id = slug;
    const {
      menu_title,
      menu_detail,
      have_sub,
      is_show,
      is_primary_menu,
      is_pattern_menu,
      pattern_menu,
    } = body;
    //SampleText.replace("Developer", "App Builder");
    const dataMenu = {
      menu_title: menu_title,
      menu_detail: menu_detail ? menu_detail : "",
      have_sub: have_sub ,
      is_show: is_show,
      is_primary_menu: is_primary_menu,
      is_pattern_menu: is_pattern_menu,
      pattern_menu: pattern_menu,
    };

    if (
      menu_id == undefined ||
      menu_title == undefined || menu_detail == undefined ||
      have_sub == undefined || is_show == undefined ||
      is_primary_menu == undefined || is_pattern_menu == undefined ||
      pattern_menu == undefined 
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        menu_id: menu_id,
        data: dataMenu
      });
    }


    const menuDataResult = await models.Menu.update(
      dataMenu, {
      where: {
        menu_id: menu_id
      }
    }
    );

    return res.status(200).json({
      status: 200,
      message: "success",
      // organization: organization ? organization : []
    });

    // await User.update({ lastName: "Doe" }, {
    //   where: {
    //     lastName: null
    //   }
    // });

  })
  .delete(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const menu_id = slug;
    if (menu_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        menu_id: menu_id,
      });
    }
    var ip = await getIPAddress()
    var currentDate = moment().format()
    // dataMenu.ip = ip
    // dataMenu.is_deleted = 0
    // dataMenu.date_created = currentDate.replace("+07:00", "+00:00")
    // dataMenu.date_updated = currentDate.replace("+07:00", "+00:00")
    const dataInformation = {
      is_deleted: 1,
      ip: ip,
      date_updated: currentDate.replace("+07:00", "+00:00"),
    };

    const _menu = await models.Menu.update(dataInformation, {
      where: {
        menu_id: menu_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
    });
  });

export default handler;
