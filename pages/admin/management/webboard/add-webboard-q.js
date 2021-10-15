import {
  Button, Checkbox, DatePicker, Form, Input, notification, Switch, Typography
} from 'antd';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useRef, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
import {
  absoluteUrl, apiInstance
} from '../../../../middleware/utils';


const { Text, Title } = Typography;

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
const { TextArea } = Input;
const config = require('./../../config');

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const [login, setLogin] = useState(null);
  const router = useRouter();

  const editor = useRef(null);
  const [content, setContent] = useState('');

  useEffect(() => {
  }, []);


  const [active, setActive] = useState('1');
  const actived = () => {
    active ? setActive(0) : setActive(1);
  };

  const [acept, setAcept] = useState('');
  const acepted = () => {
    acept ? setAcept(0) : setAcept(1);
  };

  const [date, setDate] = useState('');
  const [fields, setFields] = useState([
    {
      name: ['date_question_date'],
      value: moment(),
    },
  ]);
  async function onSubmitHandler(value) {
    var date = moment(value.date_question_date).format()
    const data = {
      organization_id: user.organization_id,
      question_title: value.question_title,
      question_detail: value.question_detail,
      question_post: value.question_post,
      question_personid: value.question_personid,
      is_show_personid: acept,
      is_approve: active,
      approve_date: date,
      date_question_date: date,
      question_view: '0',
    };

    const addwebboardData = await apiInstance().post(
      'admin/management/add-webboard-q',
      data,
    );
    if (addwebboardData.data.status == 200) {
      openNotificationRegisterSuccess();
      setTimeout(function () { //Start the timer
        router.push('/admin/management/webboard')
      }.bind(this), 2000)
    } else {
      openNotificationRegisterFail(addwebboardData.data.message);
    }
  }

  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `เพิ่มหัวข้อกระดานข่าวเรียบร้อย`,
      description: 'เพิ่มหัวข้อกระดานข่าวเรียบร้อย',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการเพิ่มหัวข้อกระดานข่าว`,
      description: messgae,
      placement: 'topRight',
    });
  };

  function onChange(value, dateString) {
    setDate(dateString);
  }

  const [form] = Form.useForm();

  const onReset = () => {
    setActive(1);
    form.resetFields();
    setFields([
      {
        name: ['date_question_date'],
        value: moment(),
      },
    ])
  };

  return (
    <Layout
      title="Government - Admin management"
      url={origin}
      origin={origin}
      user={login}
      indexSubMenu={"1"}
      indexMenu={"sub-1-4"}
      titlePage="เพิ่มหัวข้อกระดานข่าว"
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
          path: '/admin/management/webboard/add-webboard-q',
          breadcrumbName: 'เพิ่มหัวข้อกระดานข่าว',
        }
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

          <Form.Item
            name="date_question_date"
            label="วันที่ลงหัวข้อกระดานข่าว :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full "
            rules={[
              {
                required: true,
                message: 'กรุณากรอกวันที่ลงหัวข้อกระดานข่าว',
              },
            ]}
          >
            <DatePicker
              className="w-full"
              showTime
              onChange={onChange}
              style={{
                width: '100%',
              }}
              defaultValue={moment()}
            />
          </Form.Item>

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
          <Form.Item>
            <Checkbox onChange={onChange} onClick={acepted}>
              ไม่แสดงเลขประจำตัวประชาชนให้ผู้อื่นเห็น
            </Checkbox>
          </Form.Item>

          <Form.Item className="flex mt-6">
            <div className="lg:inline-flex w-full">
              <div className="inline-flex text-left lg:w-1/2">
                <Switch checked={active} onClick={actived} />
                <p className="mx-2 text-sm">อนุมัติ</p>
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
