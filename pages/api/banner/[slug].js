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
    const banner_id = slug;

    const banners = await models.banners.findOne({
      where: {
        banner_id: banner_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      banners: banners ? banners : [],
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const banner_id = slug;
    const {
      banner_title,
      banner_image,
      banner_link,
      status_active,
      num_click,
      seq,
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataBanners = {
      banner_title: banner_title,
      banner_image: banner_image,
      banner_link: banner_link,
      num_click: num_click,
      seq: seq,
      status_active: status_active,
    };

    if (
      banner_title == undefined ||
      banner_image == undefined ||
      banner_link == undefined ||
      num_click == undefined ||
      seq == undefined ||
      status_active == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        banner_id: banner_id,
        data: dataBanners,
      });
    }

    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataBanners.ip = ip
    dataBanners.is_deleted = 0
    dataBanners.date_updated = currentDate.replace("+07:00", "+00:00")

    const inforDataResult = await models.banners.update(dataBanners, {
      where: {
        banner_id: banner_id,
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
    const banner_id = slug;
    if (banner_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        banner_id: banner_id,
      });
    }

    const dataBanners = {
      is_deleted: 1,
    };

    const banners = await models.banners.update(dataBanners, {
      where: {
        banner_id: banner_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      banners: banners ? banners : [],
    });
  });

export default handler;
