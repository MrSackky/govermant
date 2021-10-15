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
    const { results, page, search, sortField = "organization_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};
    

    if (search != "") {
      if (filters == 'undefined' || filters == "null") {
        // console.log("if1")
        _search = {
          is_use: {
            [Op.ne]: 3,
          },
          [Op.or]: [
            {
              organization_name_eng: {
                [Op.like]: '%' + search + '%'
              }
            }, {
              organization_name: {
                [Op.like]: '%' + search + '%'
              },
            }
          ],


        }
      } else {
        console.log("if2")
        console.log(filters)
        _search = {
          is_use: {
            [Op.ne]: 3,
          },
          package: {
            [Op.in]: [filters],
          },
          [Op.or]: [
            {
              organization_name_eng: {
                [Op.like]: '%' + search + '%'
              }
            }, {
              organization_name: {
                [Op.like]: '%' + search + '%'
              },
            }
          ],


        }
      }


    } else {
      if (filters == 'undefined' || filters == 'null') {
        // console.log("if3")
        // console.log(filters)

        _search = {

          is_use: {
            [Op.ne]: 3,
          },

        }
      } else {
        // console.log("if4")
        // console.log(filters)
        _search = {

          is_use: {
            [Op.ne]: 3,
          },
          package: {
            [Op.in]: [filters],
          },

        }
      }

    }


    // console.log(_search)
    const _organization = await models.Organization.findAndCountAll({
      // attributes: ['package_id','code_package','name_package','size_limit'] 
      attributes: [
        'organization_id', 'organization_name', 'organization_name_eng', 'organization_logo',
        'organization_email', 'organization_address', 'organization_sub_district_id', 'organization_phone',
        'organization_fax', 'theme', 'thumbnail', 'thumbnail_link', 'thumbnail_url', 'show_index',
        'google_verify', 'social_fb', 'social_fb_pageid', 'rss', 'google_tag_manager1', 'google_tag_manager2',
        'date_created', 'date_expired', 'size_used', 'package', 'is_use'
      ],
      where: _search,
      offset: results * (page - 1),
      limit: parseInt(results),
      include: [
        {
          model: models.Packages,
          as: 'packages',
        },
      ],
      order: [
        [sortField != "undefined" && sortOrder != "undefined" ? sortField : "organization_id", sortOrder != "undefined" ? sortOrder == "ascend" ? "ASC" : "DESC" : "DESC"]
      ]
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _organization.rows,
      totalCount: _organization.count
    });
  });

export default handler;
