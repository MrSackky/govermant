import nextConnect from 'next-connect';
import middleware from '../../../middleware/auth';

const models = require('../../../db/models/index');
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
    const { organization_id = 0, header_id = 1 } = req.query;
    let _search = {
      // organization_id: organization_id,
      organization_id: organization_id,
      [Op.or]: [{
        is_deleted: null,
      },
      {
        is_deleted: 0,
      }],
      // is_primary_menu: poll_id
    };

    // console.log(_search)
    const _menu = await models.customer_header.findAndCountAll({
      // attributes: ['package_id','code_package','name_package','size_limit']
      where: _search,
      // offset: results * (page - 1),
      // limit: parseInt(results),

      order: [
        ["seq", "ASC"],
        ["header_id", "ASC"]
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
    const { body } = req;
    const { slug } = req.query;
    const {
      organization_id,
      header_image,
      header_link,
    } = body;
    //SampleText.replace("Developer", "App Builder");
    const dataMenu = {
      organization_id: organization_id,
      header_image: header_image,
      header_link: header_link,
    };

    if (
      organization_id == undefined ||
      header_image == undefined
      // header_link == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataMenu: dataMenu
      });
    }


    // console.log(dataIntro)
    const newMenu = await models.customer_header.create(dataMenu);

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
