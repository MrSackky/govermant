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
    const { organization_id, results, page, search, sortField = "poll_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};


    if (search != "") {
      if (filters == 'undefined' || filters == "null") {
        // console.log("if1")
        _search = {
          is_deleted: {
            [Op.ne]: 1,
          },
          [Op.or]: [{
            poll_title: {
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
            poll_title: {
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
    const _poll = await models.poll.findAndCountAll({
      attributes: [
        'poll_id', 'organization_id', 'poll_title', 'poll_date_s', 'poll_date_e',
        'date_created', 'date_updated', 'is_identity', 'is_deleted', 'ip'
      ],
      where: _search,
      offset: results * (page - 1),
      limit: parseInt(results),
      order: [
        [sortField != "undefined" && sortOrder != "undefined" ? sortField : "poll_id", sortOrder != "undefined" ? sortOrder == "ascend" ? "ASC" : "DESC" : "DESC"]
      ]
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _poll.rows,
      totalCount: _poll.count
    });

  })
  .delete(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const poll_id = slug;
    if (poll_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        poll_id: poll_id,
      });
    }

    const poll = await models.poll.update(dataPoll, {
      where: {
        poll_id: poll_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      poll: poll ? poll : [],
    })
  })

export default handler;
