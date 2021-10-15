import nextConnect from 'next-connect';
const models = require('../../../../../db/models/index');
import { absoluteUrl, checkIsLogin, getIPAddress, convertDatetoAddDB } from '../../../../../middleware/utils';
import moment from 'moment';
const handler = nextConnect()
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const intro_id = slug;
    console.log(intro_id)

    const introData = await models.intro.findOne({
      where: {
        intro_id: intro_id,
      },

    });


    return res.status(200).json({
      status: 200,
      message: "success",
      introData: introData ? introData : []
    });
  })
  .post(async (req, res) => { })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const intro_id = slug;
    const {
      intro_title,
      intro_url,
      intro_btn,
      intro_date_s,
      intro_date_e,
      intro_image,
      is_has_bless,
      is_admin,
      is_use
    } = body;
    //SampleText.replace("Developer", "App Builder");
    const dataIntro = {
      intro_title: intro_title,
      intro_url: intro_url ? intro_url : "",
      intro_btn: intro_btn ? intro_btn : "",
      intro_date_s: intro_date_s.replace("+07:00", "+00:00"),
      intro_date_e: intro_date_e.replace("+07:00", "+00:00"),
      intro_image: intro_image,
      is_has_bless: is_has_bless,
      is_admin: is_admin,
      is_use: is_use,
    };

    if (
      intro_id == undefined ||
      intro_url == undefined || intro_btn == undefined ||
      intro_date_s == undefined || intro_date_s == undefined ||
      intro_image == undefined || is_has_bless == undefined ||
      is_admin == undefined || is_use == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        intro_id: intro_id,
        data: dataIntro
      });
    }


    const introDataResult = await models.intro.update(
      dataIntro, {
      where: {
        intro_id: intro_id
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
    const intro_id = slug;
    if (intro_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        intro_id: intro_id
      });
    }
    var currentDate = moment().format()
    // dataIntro.ip = ip
    // dataIntro.is_deleted = 0
    // dataIntro.date_created = currentDate.replace("+07:00", "+00:00")
    // dataIntro.date_updated = currentDate.replace("+07:00", "+00:00")
    const dataOrganization = {
      is_deleted: 1,
      date_updated: currentDate.replace("+07:00", "+00:00"),

    };
    const intros = await models.intro.update(
      dataOrganization, {
      where: {
        intro_id: intro_id
      }
    }
    );

    return res.status(200).json({
      status: 200,
      message: "success",
      // organization: organization ? organization : []
    });
  })
  .patch(async (req, res) => {

  });

export default handler;
