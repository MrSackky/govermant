import Link from 'next/link';

import { useRouter } from 'next/router';
/* utils */
import { absoluteUrl, apiInstance } from '../middleware/utils';

/* components */
import Layout from '../components/layout/LayoutDefaultStyle2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

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
  notification,
} from 'antd';
import { useEffect, useState } from 'react';
const { Text, Title } = Typography;

const { TextArea } = Input;

export default function Register(props) {
  const [api, contextHolder] = notification.useNotification();
  const [url, setUrl] = useState('');
  const { origin, baseApiUrl } = props;
  const router = useRouter();

  async function onSubmitHandler(value) {
    const data = {
      "email_user": value.email,
    }

    const forget_passwordData = await apiInstance().post(
      '/forgetpassword/forget_password',
      data,
    );
    if (forget_passwordData.data.status == 200) {
      openNotificationForgetpasswordSuccess();
    } else {
      openNotificationForgetpasswordFail(forget_passwordData.data.message);
    }
  }

  const openNotificationForgetpasswordSuccess = () => {
    api.success({
      message: `ส่งคำขอเรียบร้อยแล้ว`,
      description: 'ส่งคำขอเรียบร้อยแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationForgetpasswordFail = messgae => {
    api.error({
      message: `พบปัญหาของคำขอร้องนี้`,
      description: messgae,
      placement: 'topRight',
    });
  };

  return (
    <Layout
      title="Government | Forget Password"
      url={origin}
      origin={origin}
      className="h-screen"
    >
      {contextHolder}
      <div className="mx-auto w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 py-8 min-h-3/4 mt-2 border-2 border-gray-200 ">
        <Form
          name="basic"
          layout="vertical"
          onFinish={onSubmitHandler}
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
            <p className="text-xl font-bold">ลืมรหัสผ่าน</p>
            <p className="text-gray-400 text-opacity-100">
              กรุณาระบุอีเมลล์เพื่อส่งคำขอรีเซ็ตรหัสผ่าน
            </p>
          </div>
          <Form.Item
            name="email"
            label="อีเมลล์"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            style={{ textAlign: "left !important" }}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกอีเมลล์!'
              },
              {
                async validator(rule, value) {
                  const data = {
                    "email": value,
                  }
                  const checkEmail = await apiInstance().post('/forgetpassword/check-email', data);
                  console.log()
                  if (checkEmail.data.status == 200) {
                    return Promise.resolve()

                  } else {
                    // openNotificationForgetpasswordFail(checkEmail.data.message)
                    return Promise.reject(checkEmail.data.message)
                    

                  }

                },
              },
            ]}
          >
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" size="large" placeholder="Email"
            />
          </Form.Item>
          <Form.Item className="text-center">
            <Button
              style={{
                backgroundColor: '#059669',
                borderColor: '#059669',
                height: 40,
                marginBottom: '0px !important',
              }}
              htmlType="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              <Text className="text-custom-white">ส่งคำขอรีเซ็ทรหัสผ่าน</Text>
            </Button>
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
