import nextConnect from 'next-connect';

const models = require('../../../../../db/models/index');
import middleware from '../../../../../middleware/auth';
import moment from 'moment';
import { absoluteUrl, checkIsLogin, getIPAddress, convertDatetoAddDB } from '../../../../../middleware/utils';
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
    const { results, page, search, sortField = "intro_id", sortOrder = "DESC", filters = [], isAdmin = 0, organization_id = 0 } = req.query;
    let _search = {};

    if (isAdmin == 1) {
      if (search != "") {
        if (filters == 'undefined' || filters == "null") {
          // console.log("if1")
          _search = {
            is_deleted: {
              [Op.ne]: 1,
            },
            intro_title: {
              [Op.like]: '%' + search + '%'
            },
            is_admin: isAdmin


          }
        } else {
          console.log("if2")
          console.log(filters)
          _search = {
            is_deleted: {
              [Op.ne]: 1,
            },
            intro_title: {
              [Op.like]: '%' + search + '%'
            },
            is_admin: isAdmin


          }
        }


      } else {
        if (filters == 'undefined' || filters == 'null') {
          // console.log("if3")
          // console.log(filters)

          _search = {

            is_deleted: {
              [Op.ne]: 1,
            },
            is_admin: isAdmin

          }
        } else {
          // console.log("if4")
          // console.log(filters)
          _search = {

            is_deleted: {
              [Op.ne]: 1,
            },
            is_admin: isAdmin

          }
        }

      }
    }else{
      // user
      if (search != "") {
        if (filters == 'undefined' || filters == "null") {
          // console.log("if1")
          _search = {
            is_deleted: {
              [Op.ne]: 1,
            },
            intro_title: {
              [Op.like]: '%' + search + '%'
            },
            organization_id : organization_id
  
  
          }
        } else {
          console.log("if2")
          console.log(filters)
          _search = {
            is_deleted: {
              [Op.ne]: 1,
            },
            intro_title: {
              [Op.like]: '%' + search + '%'
            },
            organization_id : organization_id
  
  
          }
        }
  
  
      } else {
        if (filters == 'undefined' || filters == 'null') {
          // console.log("if3")
          // console.log(filters)
  
          _search = {
  
            is_deleted: {
              [Op.ne]: 1,
            },
            organization_id : organization_id
  
          }
        } else {
          // console.log("if4")
          // console.log(filters)
          _search = {
  
            is_deleted: {
              [Op.ne]: 1,
            },
            organization_id : organization_id
  
          }
        }
  
      }
    }



    // console.log(_search)
    const _intro = await models.intro.findAndCountAll({
      // attributes: ['package_id','code_package','name_package','size_limit'] 
      where: _search,
      offset: results * (page - 1),
      limit: parseInt(results),
      order: [
        [sortField != "undefined" && sortOrder != "undefined" ? sortField : "intro_id", sortOrder != "undefined" ? sortOrder == "ascend" ? "ASC" : "DESC" : "DESC"]
      ]
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _intro.rows,
      totalCount: _intro.count
    });
  })
  .post(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const {
      organization_id,
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
      organization_id: organization_id,
      intro_title: intro_title,
      intro_url: intro_url,
      intro_btn: intro_btn,
      intro_date_s: intro_date_s.replace("+07:00", "+00:00"),
      intro_date_e: intro_date_e.replace("+07:00", "+00:00"),
      intro_image: intro_image,
      is_has_bless: is_has_bless,
      is_admin: is_admin,
      is_use: is_use,
    };

    if (
      organization_id == undefined ||
      intro_title == undefined || intro_url == undefined ||
      intro_btn == undefined || intro_date_s == undefined ||
      intro_date_e == undefined || intro_image == undefined ||
      is_has_bless == undefined || is_admin == undefined ||
      is_use == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataIntro: dataIntro
      });
    }
    var ip = await getIPAddress()
    console.log("ip")
    console.log(ip)
    var currentDate = moment().format()
    dataIntro.ip = ip
    dataIntro.is_deleted = 0
    dataIntro.date_created = currentDate.replace("+07:00", "+00:00")
    dataIntro.date_updated = currentDate.replace("+07:00", "+00:00")


    // console.log(dataIntro)
    const newIntro = await models.intro.create(dataIntro);

    if (newIntro == null) {
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
