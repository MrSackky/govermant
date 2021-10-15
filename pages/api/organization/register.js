import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import { addDays } from '../../../middleware/utils';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    return res.status(400).json({
      status: 400,
      message: 'deny permission!!',
    });
  })
  // Post method
  .post(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const { organization_name, name_user, organization_phone, thumbnail_url, organization_email, password } = body;
    // const userId = slug;


    var myCurrentDate = new Date();
    var myFutureDate = new Date(myCurrentDate);
    myFutureDate.setDate(myFutureDate.getDate() + 8);

    const dataUser = {
      organization_name,
      organization_phone,
      thumbnail_url,
      organization_email,
      // password,
      is_use: 1,
      package: 1,
      theme: 1,
      organization_sub_district_id : 501508,
      date_expired: addDays(myCurrentDate, 31)
    };

    if (organization_name == undefined || name_user == undefined || organization_phone == undefined || thumbnail_url == undefined || organization_email == undefined || password == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataUser: dataUser
      });
    }
    // const user = await User.create({
    //   username: 'alice123',
    //   isAdmin: true
    // }, { fields: ['username'] });
    const dataOrganization = await models.Organization.findOne({
      where: { organization_email: organization_email },
      attributes: ['organization_id', 'organization_email'],
    });
    if (dataOrganization != null) {
      return res.status(200).json({
        status: 202,
        message: 'data user "email" is exist',
      });
    }

    const dataUsers = await models.Users.findOne({ where: { user_name: organization_email } });
    if (dataUsers != null) {
      return res.status(200).json({
        status: 203,
        message: 'data user "email" is exist',
      });
    }

    const newOrganization = await models.Organization.create(dataUser);

    if (newOrganization == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }

    console.log("newOrganization")
    console.log(newOrganization)
    const dataUser2 = {
      user_name: organization_email,
      password: bcrypt.hashSync(password, salt),
      name_user,
      organization_id: newOrganization.null,
      email_user: organization_email,
      phone_user: organization_phone,
    };

    const newUser = await models.Users.create(dataUser2);


    if (newUser == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }


    return res.status(200).json({
      status: 200,
      message: 'Insert completed',
    });
    // .then(([_user, created]) => {
    //   // console.log(_user.get({
    //   //   plain: true
    //   // }))
    //   console.log("created")
    //   console.log(created)
    //   console.log("_user")
    //   console.log(_user.dataValues)

    //   if (!created) {
    //     return res.status(200).json({
    //       status: 202,
    //       message: 'data user is exist.',
    //     });
    //   }

    //   return res.status(200).json({
    //     status: 'success',
    //     message: 'done',
    //     // dataRequest: dataUser,
    //     dataResult: _user.dataValues,
    //   });
    //   //user data
    //   const dataUser2 = {
    //     user_name: organization_email,
    //     password,
    //     name_user,
    //     organization_id: _user.dataValues.organization_id,
    //     email_user: organization_email,
    //     phone_user: organization_phone,
    //   };

    // await models.Users.findOrCreate({ where: { user_name: organization_email }, defaults: dataUser2 })
    //   .then(([_user2, created2]) => {

    //     console.log("created2")
    //     console.log(created2)
    //     console.log("_user2")
    //     console.log(_user2)

    //     if (!created2) {
    //       return res.status(200).json({
    //         status: 202,
    //         message: 'data user "email" is exist.',
    //       });
    //     }
    //     return res.status(200).json({
    //       status: 'success',
    //       message: 'done',
    //       // dataRequest: dataUser,
    //       // dataResult: _user.Organization.dataValues,
    //     });
    //   })

    // })



  });

export default handler;
