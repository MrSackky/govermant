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
    const intro_blessing_id = slug;

    const blessing = await models.intro_blessing.findOne({
      where: {
        intro_blessing_id : intro_blessing_id,
      },
     
    });
    
    
    return res.status(200).json({
      status: 200,
      message: "success",
      blessing: blessing ? blessing : []
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const intro_blessing_id = slug;
    const {
      organization_id,
      text_blessing,
      name_blessing,
      position_blessing,
      work_blessing,
      year,
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataBlessing = {
      organization_id: organization_id,
      text_blessing: text_blessing,
      name_blessing: name_blessing,
      position_blessing: position_blessing,
      work_blessing: work_blessing,
      year: year,
    };

    if (
      organization_id == undefined ||
      text_blessing == undefined ||
      name_blessing == undefined ||
      position_blessing == undefined ||
      work_blessing == undefined ||
      year == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        intro_blessing_id: intro_blessing_id,
        data: dataBlessing,
      });
    }
    
    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataBlessing.ip = ip
    dataBlessing.is_deleted = 0
    dataBlessing.date_update = currentDate.replace("+07:00", "+00:00")

    const blessingDataResult = await models.intro_blessing.update(dataBlessing, {
      where: {
        intro_blessing_id: intro_blessing_id,
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
    const intro_blessing_id = slug;
    if (intro_blessing_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        intro_blessing_id: intro_blessing_id,
      });
    }

    const dataBlessing = {
      is_deleted: 1,
    };

    const intro_blessing = await models.intro_blessing.update(dataBlessing, {
      where: {
        intro_blessing_id: intro_blessing_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      intro_blessing: intro_blessing ? intro_blessing : [],
    });
  });

export default handler;
