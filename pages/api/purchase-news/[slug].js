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
    const tender_id = slug;

    const tender = await models.tender.findOne({
      where: {
        tender_id: tender_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      tender: tender ? tender : [],
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const tender_id = slug;
    const {
      tender_date,
      type_tender_id,
      tender_title,
      tender_detail,
      tender_keyword,
      expire_date,
      status_active,
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataTender = {
      tender_date: tender_date.replace('+07:00', '+00:00'),
      type_tender_id: type_tender_id,
      tender_title: tender_title,
      tender_detail: tender_detail,
      tender_keyword: tender_keyword,
      expire_date: expire_date.replace('+07:00', '+00:00'),
      status_active: status_active,
    };

    if (
      tender_date == undefined ||
      type_tender_id == undefined ||
      tender_title == undefined ||
      tender_detail == undefined ||
      tender_keyword == undefined ||
      expire_date == undefined ||
      status_active == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        tender_id: tender_id,
        data: dataTender,
      });
    }

    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataTender.ip = ip
    dataTender.is_deleted = 0
    dataTender.date_update = currentDate.replace("+07:00", "+00:00")

    const tenderDataResult = await models.tender.update(dataTender, {
      where: {
        tender_id: tender_id,
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
    const tender_id = slug;
    if (tender_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        tender_id: tender_id,
      });
    }

    const dataTender = {
      is_deleted: 1,
    };

    const tender = await models.tender.update(dataTender, {
      where: {
        tender_id: tender_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      tender: tender ? tender : [],
    });
  });

export default handler;
