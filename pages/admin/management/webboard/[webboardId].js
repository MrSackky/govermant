import {
  Button, Checkbox, DatePicker, Form, notification, Row, Select,
  Switch, Typography, Upload
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useRef, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import {
  absoluteUrl, apiInstance, convertDateDBtoDatePickerWithTime
} from '../../../../middleware/utils';

const { Text, Title } = Typography;
const { Option } = Select;

export default function Home(props) {
  const { user, origin } = props;
  const [url, setUrl] = useState('');
  const [webboardData, setWebboardData] = useState(null);
  const [fields, setFields] = useState([
    {
      name: ['question_title'],
      value: '',
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { webboardId } = router.query;
  const { Dragger } = Upload;
  const [date, setDate] = useState('');
  const [active, setActive] = useState(1);
  const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
  const config = require('./../../config');
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const [acept, setAcept] = useState(1);
  const acepted = () => {
    acept ? setAcept(0) : setAcept(1);
  };
  async function onSubmitHandler(value) {
    var date = moment(value.date_question_date).format()
    const data = {
      question_title: value.question_title,
      question_detail: value.question_detail,
      question_post: value.question_post,
      question_personid: value.question_personid,
      is_show_personid: acept,
      is_approve: active,
      date_question_date: date,
    };
    // console.log(data)
    const registerData = await apiInstance().put(
      '/webboard/' + webboardId,
      data,
    );
    if (registerData.data.status == 200) {
      openNotificationRegisterSuccess();
      fetchWebboardData();
      setTimeout(
        function () {
          //Start the timer
          router.push('/admin/management/webboard');
        }.bind(this),
        2000,
      );
    } else {
      openNotificationRegisterFail(registerData.data.message);
    }
  }

  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `บันทึกข้อมูลสำเร็จ`,
      description: 'บันทึกข้อมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการบันทึกข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };

  useEffect(() => {
    fetchWebboardData();
  }, []);

  const onResetForm = () => {
    setActive(webboardData.is_approve == 1 ? 1 : 0);
    setAcept(webboardData.is_show_personid == 1 ? 1 : 0);
    setFields([
      {
        name: ['question_title'],
        value: webboardData.question_title,
      },
      {
        name: ['question_detail'],
        value: webboardData.question_detail,
      },
      {
        name: ['question_post'],
        value: webboardData.question_post,
      },
      {
        name: ['question_personid'],
        value: webboardData.question_personid,
      },
      {
        name: ['date_question_date'],

        value: moment(
          convertDateDBtoDatePickerWithTime(
            webboardData.date_question_date,
          ),
        ),
      },
      {
        name: ['is_show_personid'],
        value: webboardData.is_show_personid,
      },
      {
        name: ['is_approve'],
        value: webboardData.is_approve,
      },
    ]);
  };
  const fetchWebboardData = async () => {
    const _webboardData = await apiInstance().get('webboard/' + webboardId);
    setWebboardData(_webboardData.data.webboard_q)
    setActive(_webboardData.data.webboard_q.is_approve);
    setAcept(_webboardData.data.webboard_q.is_show_personid)

    setFields([
      {
        name: ['question_title'],
        value: _webboardData.data.webboard_q.question_title,
      },
      {
        name: ['question_detail'],
        value: _webboardData.data.webboard_q.question_detail,
      },
      {
        name: ['question_post'],
        value: _webboardData.data.webboard_q.question_post,
      },
      {
        name: ['question_personid'],
        value: _webboardData.data.webboard_q.question_personid,
      },
      {
        name: ['date_question_date'],
        value: moment(
          convertDateDBtoDatePickerWithTime(
            _webboardData.data.webboard_q.date_question_date,
          ),
        ),
      },
      {
        name: ['is_show_personid'],
        value: _webboardData.data.webboard_q.is_show_personid,
      },
      {
        name: ['is_approve'],
        value: _webboardData.data.webboard_q.is_approve,
      },
    ]);
  };


  function onChange(value, dateString) {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    setDate(dateString);
  }


  return (
    <Layout
      title="Government - Admin management"
      titlePage={
        'แก้ไขหัวข้อกระดานข่าว ' +
        (webboardData ? webboardData.question_title : '')
      }
      url={origin}
      indexSubMenu={"1"}
      indexMenu={"sub-1-4"}
      origin={origin}
      props={props}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management/webboard',
          breadcrumbName: 'จัดการหัวข้อกระดานข่าว',
        },
        {
          path: '/admin/management/add-webboard',
          breadcrumbName: 'แก้ไขหัวข้อกระดานข่าว',
        },
      ]}
    >
      <div>
        {contextHolder}
        {/* {JSON.stringify(organizationData)} */}
        <Row>
          {/* {JSON.stringify(organizationData)} */}
          <Form
            name="basic"
            className="w-full"
            // initialValues={{ email: email, invitationCode: code }}
            layout="vertical"
            onFinish={onSubmitHandler}
            // onFinishFailed={onFinishFailed}
            requiredMark={true}
            fields={fields}
          >
            <Form.Item
              name="question_title"
              label="หัวข้อกระดานข่าว :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกหัวข้อกระดานข่าว',
                },
              ]}
            >
              <TextArea
                id="#"
                type="text"
                placeholder="หัวข้อกระดานข่าว"
                className="resize-none border rounded-md"
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="question_detail"
              label="รายละเอียด :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกรายละเอียดกระดานข่าว',
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
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="date_question_date"
              label="วันที่ลงหัวข้อกระดานข่าว"
              className="block text-gray-700 text-sm font-bold mb-2 w-full "
              style={{ textAlign: 'left !important' }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกวันที่ลงหัวข้อกระดานข่าว',
                },
              ]}
            >
              {/* <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ format: 'HH:mm:ss' }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // showTime={{ defaultValue: moment('00:00:00') }}
              /> */}
              <DatePicker
                className="w-full"
                showTime
                onChange={onChange}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="question_post"
              label="ผู้โพสหัวข้อกระดานข่าว :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อผู้โพสหัวข้อกระดานข่าว',
                },
              ]}
            >
              <TextArea
                id="#"
                type="text"
                placeholder="ผู้ดูแลระบบ"
                className="resize-none border rounded-md"
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="question_personid"
              label="เลขประจำตัวประชาชน :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกเลขประจำตัวประชาชน',
                },
              ]}
            >
              <TextArea
                id="#"
                type="text"
                placeholder="เลขประจำตัวประชาชน"
                className="resize-none border rounded-md"
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item>
              <Checkbox
                checked={acept}
                onClick={acepted}>
                ไม่แสดงเลขประจำตัวประชาชนให้ผู้อื่นเห็น
              </Checkbox>
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item className="flex mt-6">
              <div className="lg:inline-flex w-full">
                <div className="lg:inline-flex text-left w-1/2">
                  <Switch
                    className="swt-btn"
                    checked={active}
                    onClick={value => setActive(value ? 1 : 0)}
                  />
                  <p className="mx-2 text-sm">การแสดงผล</p>
                </div>
                <div className="text-center lg:text-right w-full lg:w-1/2">
                  <Button
                    htmlType="button"
                    onClick={onResetForm}
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
        </Row>
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
