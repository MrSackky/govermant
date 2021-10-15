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
    const { organization_id, results, page, search, sortField = "complain_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};


    if (search != "") {
      if (filters == 'undefined' || filters == "null") {
        // console.log("if1")
        _search = {
          // is_done: {
          //   [Op.ne]: 1,
          // },
          [Op.or]: [{
            complain_post: {
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
          // is_done: {
          //   [Op.ne]: 1,
          // },
          [Op.or]: [{
            complain_post: {
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

          // is_done: {
          //   [Op.ne]: 1,
          // },
          organization_id: organization_id

        }
      } else {
        // console.log("if4")
        // console.log(filters)
        _search = {

          // is_done: {
          //   [Op.ne]: 1,
          // },
          organization_id: organization_id

        }
      }

    }


    // console.log(_search)
    const _complain = await models.complain.findAndCountAll({
      attributes: [
        'complain_id', 'organization_id', 'complain_post', 'complain_detail', 'complain_name_posted',
        'complain_phone', 'complain_email', 'date_created', 'date_updated',
        'ip', 'personid', 'is_done',
      ],
      where: _search,
      offset: results * (page - 1),
      limit: parseInt(results),
      order: [
        [sortField != "undefined" && sortOrder != "undefined" ? sortField : "complain_id", sortOrder != "undefined" ? sortOrder == "ascend" ? "ASC" : "DESC" : "DESC"]
      ]
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _complain.rows,
      totalCount: _complain.count
    });

  })
  .delete(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const complain_id = slug;
    if (complain_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        complain_id: complain_id,
      });
    }

    const complain = await models.complain.update(dataComplain, {
      where: {
        complain_id: complain_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      complain: complain ? complain : [],
    })
  })

export default handler;
