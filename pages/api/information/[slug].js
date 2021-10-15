import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import { addDays , getIPAddress } from '../../../middleware/utils';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
import moment from 'moment';

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const infor_id = slug;

    const information = await models.information.findOne({
      where: {
        infor_id: infor_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      information: information ? information : [],
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const infor_id = slug;
    const {
      infor_date,
      infor_title,
      infor_detail,
      infor_image,
      infor_keyword,
      infor_view,
      status_active,
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataInfor = {
      infor_title: infor_title,
      infor_detail: infor_detail,
      infor_date: infor_date.replace('+07:00', '+00:00'),
      infor_image: infor_image,
      infor_keyword: infor_keyword,
      infor_view: infor_view,
      status_active: status_active,
    };

    if (
      infor_title == undefined ||
      infor_detail == undefined ||
      infor_date == undefined ||
      infor_image == undefined ||
      infor_keyword == undefined ||
      infor_view == undefined ||
      status_active == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        infor_id: infor_id,
        data: dataInfor,
      });
    }

    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataInfor.ip = ip
    dataInfor.is_deleted = 0
    dataInfor.date_update = currentDate.replace("+07:00", "+00:00")

    const inforDataResult = await models.information.update(dataInfor, {
      where: {
        infor_id: infor_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
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
    const infor_id = slug;
    if (infor_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        infor_id: infor_id,
      });
    }

    const dataInformation = {
      is_deleted: 1,
    };

    const information = await models.information.update(dataInformation, {
      where: {
        infor_id: infor_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      information: information ? information : [],
    });
  });

export default handler;
