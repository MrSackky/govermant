import moment from 'moment';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/auth';
import { getIPAddress } from '../../../middleware/utils';
const models = require('../../../db/models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const header_id = slug;

    const cover = await models.customer_header.findAndCountAll({
      where: {
        header_id: header_id,
        is_deleted: 0,
      },

    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      cover: cover ? cover.rows : [],
    });

  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const header_id = slug;
    const {
      header_image,
      header_link,
      is_show
    } = body;
    //SampleText.replace("Developer", "App Builder");
    var ip = await getIPAddress()
    var currentDate = moment().format()
    const dataMenu = {
      header_image: header_image,
      header_link: header_link,
      is_show: is_show,
      ip: ip,
      date_updated: currentDate.replace("+07:00", "+00:00"),
    };

    if (
      header_image == undefined
      // header_link == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        header_id: header_id,
        data: dataMenu
      });
    }


    const menuDataResult = await models.customer_header.update(
      dataMenu, {
      where: {
        header_id: header_id
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
    const header_id = slug;
    if (header_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        header_id: header_id,
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

    const _menu = await models.customer_header.update(dataInformation, {
      where: {
        header_id: header_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
    });
  });

export default handler;
