import models from '../../db/models/index';
import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { message } from 'antd';
const { promisify } = require('util')
const fastFolderSize = require('fast-folder-size')
import { getDatediff } from '../../middleware/utils';

const KEY = process.env.JWT_KEY;

const handler = nextConnect()
  .get((req, res) => { })
  .post(async (req, res) => {
    /* Get Post Data */
    const { user_name, password } = req.body;
    /* Any how email or password is blank */
    if (!user_name || !password) {
      return res.status(200).json({
        status: 400,
        message: 'Request missing username or password',
      });
    }
    /* Check user in database */
    const user = await models.Users.findOne({
      where: { user_name: user_name, status_active: 1 },
      include: [{
        model: models.Organization,
        as: '_organizations',
      },],
      attributes: ['user_id', 'user_name', 'password', 'organization_id', 'type_user'],
      limit: 1,
    });
    /* Check if exists */
    if (!user) {
      return res.status(200).json({ status: 401, message: 'ไม่มีชื่อผู้ใช้นี้' });
    }
    /* Define variables */
    const dataUser = user.toJSON();
    // console.log(dataUser)
    const userId = dataUser.user_id,
      userEmail = dataUser.user_name,
      userPassword = dataUser.password,
      type_user = dataUser.type_user,
      organization_id = dataUser.organization_id,
      package_id = dataUser._organizations.package,
      date_expired = dataUser._organizations.date_expired,
      name_organizations = dataUser._organizations.organization_name;
    /* Check and compare password */
    bcrypt.compare(password, userPassword).then(async isMatch => {
      if (isMatch) {
        /* User matched */
        /* Create JWT Payload */
        


        const payload = {
          id: userId,
          email: userEmail,
          type_user: type_user,
          organization_id: organization_id,
          name_organizations: name_organizations,
          package_id: package_id,
          date_expired: date_expired
        };



        if (type_user == 2) {
         
          var _datediffExpried = await getDatediff(date_expired)
          if (parseInt(_datediffExpried) <= -31) {
  
            return res.status(200).json({
              status: 201,
              message: 'หมดอายุการใช้งาน\r\nกรุณาทำการต่ออายุการใช้งาน',
            });
  
          }

          try {
            const fastFolderSizeAsync = promisify(fastFolderSize)
            const bytes = await fastFolderSizeAsync('./public/uploads/c-' + organization_id)

            console.log("bytes")
            console.log(bytes)
            payload.size_used = bytes

            const dataOrganization = {
              size_used: bytes,
            };
            console.log(dataOrganization)
            const organization = await models.Organization.update(
              dataOrganization, {
              where: {
                organization_id: organization_id
              }
            }
            );
          } catch (error) {

          }


        }


        /* Sign token */
        jwt.sign(
          payload,
          KEY,
          {
            // expiresIn: 31556926, // 1 year in seconds
            expiresIn: 7200, // 1 year in seconds
          },
          (err, token) => {
            return res.status(200).json({
              status: 200,
              message: 'เข้าสู่ระบบสำเร็จ ',
              token: token,
              // bytes
            });
          },
        );
      } else {
        return res.status(200).json({ status: 402, message: 'ชื่อผู้ใช้หรือรหัสผ่านผิด' });
      }
    });
  });
export default handler;
