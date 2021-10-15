import Link from 'next/link';
import Router, { useRouter } from 'next/router';
/* utils */
import { absoluteUrl, apiInstance, checkIsLogin } from '../middleware/utils';
import Cookies from 'js-cookie';
/* components */
import Layout from '../components/layout/LayoutDefaultStyle2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react'

library.add(fas);

import {
  Carousel,
  Row,
  Col,
  Typography,
  Image,
  Button,
  Input,
  Card,
  Form,
  notification
} from 'antd';

const { Text, Title } = Typography;

const { TextArea } = Input;

export default function Login(props) {
  const { origin, baseApiUrl } = props;
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    fetchUserLogin()
  }, [])

  async function fetchUserLogin() {
    const userLogin = await checkIsLogin()
    console.log(userLogin)
    var dateNow = new Date();
    if (userLogin) {
      if (parseInt(userLogin.exp) > parseInt((dateNow.getTime()).toString().substring(0, 10))) {
        Router.push('/admin/dashborad');
      }
    }

  }


  async function onSubmitHandler(value) {
    const data = {
      user_name: value.username,
      password: value.password
    };
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // const loginApi = await fetch(`${baseApiUrl}/auth`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // }).catch(error => {
    //   console.error('Error:', error);
    // });
    const loginData = await apiInstance().post('/auth', data);
    if (loginData.data.status == 200) {
      openNotificationRegisterSuccess()
      // เดวมี function ต่อ
      Cookies.set('token', loginData.data.token);
      // window.location.href = referer ? referer : "/";
      // const pathUrl = referer ? referer.lastIndexOf("/") : "/";
      Router.push('/admin/dashborad');
    } else {
      openNotificationRegisterFail(loginData.data.message)

    }

  }

  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `เข้าสู่ระบบเรียบร้อย`,
      description: 'เข้าสู่ระบบเรียบร้อยแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = (messgae) => {
    api.error({
      message: `พบปัญหาระหว่างการเข้าสู่ระบบ`,
      description: messgae,
      placement: 'topRight',
    });
  };
  return (
    <Layout title="Government | Login Page" url={origin} origin={origin} className="h-screen">
      {contextHolder}
      {/* <div className="mx-auto text-black rounded-xl shadow-xl w-96">
        <TextArea
          placeholder="ชื่อ-สกุล"
        />
        <Button className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded-full h-8 text-white bg-transparent font-bold items-center justify-center hover:bg-white-500 hover:text-white py-2 px-4 border border-white-500 ">
          ขอใบเสนอราคา
        </Button>
      </div> */}
      <div className="mx-auto w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 py-8 min-h-3/4 mt-2 border-2 border-gray-200 ">
        <Form
          name="basic"
          // className="w-96"
          // initialValues={{ email: email, invitationCode: code }}
          layout="vertical"
          onFinish={onSubmitHandler}
          // onFinishFailed={onFinishFailed}
          requiredMark={true}
        >
          <div className="flex items-center justify-between mt-2 mr-2 ml-2">
            <p className="">
              <a
                href="/"
                className="text-black no-underline hover:text-green-500"
              >
                <FontAwesomeIcon
                  icon={['fas', 'long-arrow-alt-left']}
                  className="mr-1"
                />
                กลับหน้าหลัก
              </a>
            </p>
            <p className="">
              ยังไม่บัญชีผู้ใช้ ?
              <a
                href="register"
                className="text-black no-underline hover:text-green-500"
              >
                สมัครสมาชิก
              </a>
            </p>
          </div>
          <div className="text-left mt-8">
            <p className="text-xl font-bold">เข้าสู่ระบบ</p>
            <p className="text-gray-400 text-opacity-100">
              เข้าสู่ระบบเพื่อใช้งานระบบเว็บไซต์หน่วยงานสำเร็จรูป
            </p>
          </div>
          <Form.Item className="mb-4"
            name="username"
            //  label="รหัสผ่าน"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[{ required: true, message: 'กรุณากรอก ชื่อผู้ใช้!' }]}
          >
            <input
              // name="user_name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              size="large"
              placeholder="Username"
            ></input>
          </Form.Item>
          <Form.Item className="mb-4"
            name="password"
            //  label="รหัสผ่าน"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[{ required: true, message: 'กรุณากรอก รหัสผ่าน!' }]}
          >
            <input
              // name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              size="large"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="flex mt-6">
            <label className="flex items-center">
              <p className="">
                <input type="checkbox" className="form-checkbox mr-2"></input>
                จดจำฉัน
              </p>
            </label>
          </Form.Item>
          <Form.Item className="text-center">
            <Button
              // type="primary"
              style={{
                backgroundColor: '#059669',
                borderColor: '#059669',
                height: 40,
                marginBottom: '0px !important',
              }}
              htmlType="submit"
              // tbgreen
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            // style={{ height: 40 }}
            >
              <Text
                className="text-custom-white"
              >
                เข้าสู่ระบบ
              </Text>
            </Button>

            <a href="/forget_password" className="text-gray-400 hover:text-gray-800 px-10 ">
              ลืมรหัสผ่าน?
            </a>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
/* getServerSideProps */
export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const referer = req.headers.referer || '';
  const baseApiUrl = `${origin}/api`;

  return {
    props: {
      origin,
      baseApiUrl,
      referer,
    },
  };
}
