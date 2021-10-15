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
    const { organization_id, results, page, search, sortField = "infor_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};


    if (search != "") {
      if (filters == 'undefined' || filters == "null") {
        // console.log("if1")
        _search = {
          is_deleted: {
            [Op.ne]: 1,
          },
          [Op.or]: [{
            infor_title: {
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
            infor_title: {
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
    const _information = await models.information.findAndCountAll({
      attributes: [
        'infor_id', 'organization_id', 'infor_date', 'infor_title',
        'infor_detail', 'infor_image', 'infor_keyword', 'infor_view',
        'date_created', 'date_update', 'status_active', 'is_deleted', 'ip'
      ],
      where: _search,
      offset: results * (page - 1),
      limit: parseInt(results),
      order: [
        [sortField != "undefined" && sortOrder != "undefined" ? sortField : "infor_id", sortOrder != "undefined" ? sortOrder == "ascend" ? "ASC" : "DESC" : "DESC"]
      ]
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _information.rows,
      totalCount: _information.count
    });

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

    const information = await models.information.update(dataInformation, {
      where: {
        infor_id: infor_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      information: information ? information : [],
    })
  })

export default handler;
