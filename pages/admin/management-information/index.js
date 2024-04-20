import Link from 'next/link';

import dynamic from 'next/dynamic';
import ReactDOM, { flushSync } from 'react-dom';


const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


/* utils */
import { absoluteUrl, checkIsLogin, apiInstance } from '../../../middleware/utils';

/* components */
import Layout from '../../../components/layout/LayoutAdmin';
// import UserNav from '../components/navigation/User';
import React, { useEffect, useState, useRef } from 'react'

import {
  Carousel,
  Row,
  Col,
  Typography,
  Image,
  Button,
  Input,
  Card,
  Switch,
  Form,
  notification
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { set } from 'js-cookie';
const { Text, Title } = Typography;



const config = require('../config');

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const { user, origin } = props;
  const [login, setLogin] = useState(null)
  const [news, setNews] = useState(null)

  const editor = useRef(null)
  const [content, setContent] = useState('')



  useEffect(() => {
    fetchOrganizationData()
  }, [])

  const fetchOrganizationData = async () => {

    const _newsData = await apiInstance().get(
      'information-news/1'
    );
    console.log(_newsData.data.information_news)
    setContent(_newsData ? _newsData.data.information_news.infor_detail : '')
    setNews(_newsData.data.information_news)
  }
  const onSubmitHandler = async (value) => {
    console.log(content)
    const data = {
      'infor_detail': content
    }
    // console.log(data)
    const registerData = await apiInstance().put('/information-news/1' , data);
    if (registerData.data.status == 200) {
      openNotificationSuccess()
      fetchOrganizationData();

    } else {
      openNotificationFail(registerData.data.message)

    }
  }

  const openNotificationSuccess = () => {
    api.success({
      message: `บันทึกข้อมูลสำเร็จ`,
      description: 'บันทึกข้อมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationFail = (messgae) => {
    api.error({
      message: `พบปัญหาระหว่างการบันทึกข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };


  const onReset = () => {
    // form.resetFields();
    setContent(news.infor_detail)

  };
  return (
    <Layout titlePage={"ข่าวประชาสัมพันธ์"} isMain={true} indexMenu={"2"} title="Government - Admin management" url={origin} origin={origin} user={login} props={props}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        }, {
          path: '/admin/management-information',
          breadcrumbName: 'ข่าวประชาสัมพันธ์',
        }]
      }
    >
      {contextHolder}
      <JoditEditor
        ref={editor}
        value={content}
        config={config.config(user)}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => { }}
      />
      <br/>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onSubmitHandler}
        requiredMark={true}
        form={form}
      // fields={fields}
      >

        <Form.Item className="flex mt-6">


          <div className="text-center lg:text-right w-full lg:w-full">
            <Button
              htmlType="button"
              onClick={onReset}
              style={{
                backgroundColor: '#C2CFE0',
                borderColor: '#C2CFE0',
                height: 40,
                width: 110,
                marginBottom: '0px !important',
                marginRight: '2px',
                color: 'white !important',
              }}
              // htmlType="submit"
              className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/4"
            >
              <Text className="text-custom-black ">รีเซ็ท</Text>
            </Button>
            <Button
              // type="primary"
              style={{
                backgroundColor: '#059669',
                borderColor: '#059669',
                height: 40,
                width: 110,
                marginBottom: '0px !important',
                color: 'white !important',
              }}
              htmlType="submit"
              className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/4"
            >
              <Text className="text-custom-white ">บันทึก</Text>
            </Button>
          </div>

        </Form.Item>
      </Form>




    </Layout>
  );
}
/* getServerSideProps */
export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  return {
    props: {
      origin,
    },
  };
}

