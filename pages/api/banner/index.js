import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
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
    const { organization_id, results, page, search, sortField = "banner_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};


    if (search != "") {
      if (filters == 'undefined' || filters == "null") {
        // console.log("if1")
        _search = {
          is_deleted: {
            [Op.ne]: 1,
          },
          [Op.or]: [{
            banner_title: {
              [Op.like]: '%' + search + '%'
            },
          }
          ],
          organization_id: organization_id

        }
      } else {
        console.log("if2")
        console.log(filters)
        _search = {
          is_deleted: {
            [Op.ne]: 1,
          },
          [Op.or]: [{
            banner_title: {
              [Op.like]: '%' + search + '%'
            },
          }
          ],
          organization_id: organization_id


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
          organization_id: organization_id

        }
      } else {
        // console.log("if4")
        // console.log(filters)
        _search = {

          is_deleted: {
            [Op.ne]: 1,
          },
          organization_id: organization_id

        }
      }

    }


    // console.log(_search)
    const _banner = await models.banners.findAndCountAll({
      attributes: [
        'banner_id',
        'organization_id',
        'banner_title',
        'banner_image',
        'banner_link',
        'status_active',
        'num_click',
        'date_created',
        'date_updated',
        'is_deleted',
        'ip',
        'seq',
      ],
      where: _search,
      offset: results * (page - 1),
      limit: parseInt(results),
      order: [
        [sortField != "undefined" && sortOrder != "undefined" ? sortField : "banner_id", sortOrder != "undefined" ? sortOrder == "ascend" ? "ASC" : "DESC" : "DESC"]
      ]
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _banner.rows,
      totalCount: _banner.count
    });

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

    const banners = await models.banners.update(dataBanner, {
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
