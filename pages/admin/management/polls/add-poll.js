import {
  Button,
  DatePicker,
  Form,
  Input,
  notification,
  Switch,
  Typography
} from 'antd';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import React, { useEffect, useRef, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import { absoluteUrl, apiInstance } from '../../../../middleware/utils';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
const { Text, Title } = Typography;

const { TextArea } = Input;
const config = require('../../config');

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const [login, setLogin] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [menus, setMenus] = useState([]);
  const [dataDelete, setDataDelete] = useState(null);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });
  const editor = useRef(null);
  const [content, setContent] = useState('');

  useEffect(() => {

  }, []);



  const [active, setActive] = useState(1);
  const actived = () => {
    active ? setActive(0) : setActive(1);
  };


  async function onSubmitHandler(value) {
    var date_s_Str = moment(value.poll_date_s).format();
    var date_e_Str = moment(value.poll_date_e).format();
    const data = {
      organization_id: user.organization_id,
      poll_title: value.poll_title,
      poll_detail: value.poll_detail,
      poll_date_s: date_s_Str,
      poll_date_e: date_e_Str,
      is_identity: active,
    };

    const addactivitiesData = await apiInstance().post(
      'admin/management/add-poll',
      data,
    );
    if (addactivitiesData.data.status == 200) {
      openNotificationRegisterSuccess();
      setTimeout(
        function () {
          //Start the timer
          router.push('/admin/management/polls/' + addactivitiesData.data.poll_id);
        }.bind(this),
        2000,
      );
    } else {
      openNotificationRegisterFail(addactivitiesData.data.message);
    }
  }

  const validateURL = inputText => {
    setUrl(validator.trim(inputText));
  };

  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `เพิ่มแบบสำรวจความคิดเห็นสำเร็จ`,
      description: 'เพิ่มแบบสำรวจความคิดเห็นสำเร็จแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการเพิ่มแบบสำรวจความคิดเห็น`,
      description: messgae,
      placement: 'topRight',
    });
  };

  const contentStyle = {
    height: 'auto',
    textAlign: 'center',
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const [form] = Form.useForm();

  const onReset = () => {
    setActive(1);
    form.resetFields();
  };

  return (
    <Layout
      title="Government - Admin management"
      url={origin}
      origin={origin}
      user={login}
      indexSubMenu={'1'}
      indexMenu={'sub-1-6'}
      titlePage="เพิ่มแบบสำรวจความคิดเห็น"
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management/polls',
          breadcrumbName: 'จัดการแบบสำรวจความคิดเห็น',
        },
        {
          path: '/admin/management/polls/add-poll',
          breadcrumbName: 'เพิ่มแบบสำรวจความคิดเห็น',
        },
      ]}
    >
      {contextHolder}
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
      ></link>

      <div className="w-5/6 lg:w-full mx-auto">
        <Form
          name="basic"
          layout="vertical"
          onFinish={onSubmitHandler}
          requiredMark={true}
          form={form}
        >
          <Form.Item
            name="poll_title"
            label="ชื่อแบบสำรวจ :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อแบบสำรวจ',
              },
            ]}
          >
            <TextArea
              id="#"
              type="text"
              placeholder="ชื่อแบบสำรวจ"
              className="resize-none border rounded-md"
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            name="poll_detail"
            label="คำอธิบายแบบสำรวจ :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกคำอธิบายแบบสำรวจ',
              },
            ]}
          >
            <JoditEditor
              ref={editor}
              value={content}
              config={config.config(user)}
              height={'700px'}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => { }}
            />
          </Form.Item>
          <Form.Item
            name="poll_date_s"
            label="วันที่เปิดให้แสดงความคิดเห็น :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full "
            rules={[
              {
                required: true,
                message: 'กรุณากรอกเลือกวันที่เปิดให้แสดงความคิดเห็น',
              },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            // showTime={{ defaultValue: moment('00:00:00') }}
            />
          </Form.Item>
          <Form.Item
            name="poll_date_e"
            label="วันที่ปิดให้แสดงความคิดเห็น :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full "
            rules={[
              {
                required: true,
                message: 'กรุณากรอกเลือกวันที่ปิดให้แสดงความคิดเห็น',
              },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            // showTime={{ defaultValue: moment('00:00:00') }}
            />
          </Form.Item>
          <Form.Item className="flex mt-6">
            <div className="lg:inline-flex w-full">
              <div className="inline-flex text-left lg:w-1/2">
                <Switch checked={active} onClick={actived} />
                <p className="mx-2 text-sm">การแสดงผล</p>
              </div>
              <div className="text-center lg:text-right w-full lg:w-1/2">
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
            </div>
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

  return {
    props: {
      origin,
    },
  };
}
