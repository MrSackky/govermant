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
    const activities_id = slug;

    const activities = await models.activities.findOne({
      where: {
        activities_id : activities_id,
      },
     
    });
    
    
    return res.status(200).json({
      status: 200,
      message: "success",
      activities: activities ? activities : []
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const activities_id = slug;
    const {
      organization_id,
      activities_date,
      activities_title,
      activities_detail,
      activities_image,
      activities_keyword,
      is_slide,
      status_active,
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataActivities = {
      organization_id: organization_id,
      activities_title: activities_title,
      activities_detail: activities_detail,
      activities_image: activities_image,
      activities_date: activities_date.replace('+07:00', '+00:00'),
      activities_keyword: activities_keyword,
      is_slide: is_slide,
      status_active: status_active,
    };

    if (
      organization_id == undefined ||
      activities_date == undefined ||
      activities_title == undefined ||
      activities_detail == undefined ||
      activities_image == undefined ||
      activities_keyword == undefined ||
      is_slide  == undefined ||
      status_active == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        activities_id: activities_id,
        data: dataActivities,
      });
    }
    
    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataActivities.ip = ip
    dataActivities.is_deleted = 0
    dataActivities.date_update = currentDate.replace("+07:00", "+00:00")

    const activitiesDataResult = await models.activities.update(dataActivities, {
      where: {
        activities_id: activities_id,
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
    const activities_id = slug;
    if (activities_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        activities_id: activities_id,
      });
    }

    const dataActivities = {
      is_deleted: 1,
    };

    const activities = await models.activities.update(dataActivities, {
      where: {
        activities_id: activities_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      activities: activities ? activities : [],
    });
  });

export default handler;
