import {
  Button, DatePicker, Form, notification, Row, Select,
  Switch, Typography
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
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
  const [tenderData, setTenderData] = useState(null);
  const [active, setActive] = useState(1);
  const [slide, setSlide] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageLandingPage, setImageLandingPage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fields, setFields] = useState([
    {
      name: ['tender_title'],
      value: '',
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { purchaseNewsId } = router.query;
  const config = require('../../config');
  const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const [tender_type, setTender_type] = useState(null)

  const [menu, setMenu] = useState('');

  async function onSubmitHandler(value) {
    var date_s_Str = moment(value.tender_date).format()
    var date_e_Str = moment(value.expire_date).format()
    const data = {
      organization_id: user.organization_id,
      tender_date: date_s_Str,
      type_tender_id: menu,
      tender_title: value.tender_title,
      tender_detail: value.tender_detail,
      tender_keyword: value.tender_keyword,
      expire_date: date_e_Str,
      status_active: active,
    };
    // console.log(data)
    const registerData = await apiInstance().put(
      '/purchase-news/' + purchaseNewsId,
      data,
    );
    if (registerData.data.status == 200) {
      openNotificationRegisterSuccess();
      fetchTenderData();
      setTimeout(
        function () {
          //Start the timer
          router.push('/admin/management/purchase-news');
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
    tender_typeData();
    fetchTenderData();
  }, []);

  const tender_typeData = async () => {
    const tender_type_Data = await apiInstance().get(
      'admin/management/tender_type'
    );

    setTender_type(tender_type_Data.data.data)
  }


  const onResetForm = () => {
    setActive(tenderData.status_active == 1 ? 1 : 0);
    setFields([
      {
        name: ['tender_date'],
        value: moment(
          convertDateDBtoDatePickerWithTime(
            tenderData.tender_date,
          ),
        ),
      },
      {
        name: ['type_tender_id'],
        value: tenderData.type_tender_id,
      },
      {
        name: ['tender_title'],
        value: tenderData.tender_title,
      },
      {
        name: ['tender_detail'],
        value: tenderData.tender_detail,
      },
      {
        name: ['tender_keyword'],
        value: tenderData.tender_keyword,
      },
      {
        name: ['expire_date'],
        value: moment(
          convertDateDBtoDatePickerWithTime(
            tenderData.expire_date,
          ),
        ),
      },
      {
        name: ['status_active'],
        value: tenderData.status_active,
      },
    ]);
  };
  const fetchTenderData = async () => {
    const _tenderData = await apiInstance().get(
      'purchase-news/' + purchaseNewsId,
    );
    // console.log(_tenderData.data.tender.tender_date);
    // console.log(
    //   convertDateDBtoDatePickerWithTime(
    //     _tenderData.data.tender.tender_date,
    //   ),
    // );
    setActive(_tenderData.data.tender.status_active);
    setTenderData(_tenderData.data.tender)
    // console.log(_tenderData.data.tender.tender_date);
    setFields([
      {
        name: ['tender_date'],
        value: moment(
          convertDateDBtoDatePickerWithTime(
            _tenderData.data.tender.tender_date,
          ),
        ),
      },
      {
        name: ['type_tender_id'],
        value: _tenderData.data.tender.type_tender_id,
      },
      {
        name: ['tender_title'],
        value: _tenderData.data.tender.tender_title,
      },
      {
        name: ['tender_detail'],
        value: _tenderData.data.tender.tender_detail,
      },
      {
        name: ['tender_keyword'],
        value: _tenderData.data.tender.tender_keyword,
      },
      {
        name: ['expire_date'],
        value: moment(
          convertDateDBtoDatePickerWithTime(
            _tenderData.data.tender.expire_date,
          ),
        ),
      },
      {
        name: ['status_active'],
        value: _tenderData.data.tender.status_active,
      },
    ]);
  };


  function handleChange(value) {
    console.log(`selected ${value}`);
    setMenu(value);
  }

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: '/api/upload/purchase-news',
    preview: false,
    // uid: user.type_user == 1 ? "admin" : user.organization_id,
    // beforeUpload(file) {
    // 	const isLt10M = file.size / 1024 / 1024 < 10
    // 	if (!isLt10M) {
    // 		notification.open({
    // 			message: 'Upload error!',
    // 			description: <Text className="text-black">Image must smaller than 10MB!</Text>,
    // 		})
    // 	}
    // 	return isLt10M
    // },
    customRequest: options => {
      const data = new FormData();
      data.append('file', options.file);
      data.append('id', user.type_user == 1 ? 'admin' : user.organization_id);
      const config = {
        headers: {
          'content-type':
            'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
        },
      };
      axios
        .post(options.action, data, config)
        .then(res => {
          // imageLandingPage
          // console.log(res.data.data.list[0]._name)
          setImageLandingPage(res.data.data.list[0]._name);
          options.onSuccess(res.data, options.file);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async onChange(info) {
      const { status } = info.file;
      // console.log(user)
      switch (info.file.status) {
        // case "uploading":
        //   nextState.selectedFileList = [info.file];
        //   break;
        case 'done':
          if (!info.file.url && !info.file.preview) {
            info.file.preview = await getBase64(info.file.originFileObj);
          }
          setPreviewImage(info.file.url || info.file.preview);
          setPreviewVisible(true);
          break;

        default:
          // error or removed
          resetImagePreview();
      }
      //console.log(info.file)

      // this.setState({
      //   previewImage: file.url || file.preview,
      //   previewVisible: true,
      // });
    },
    onRemove(info) {
      console.log('onRemove');
      console.log(info);
      resetImagePreview();
    },
  };

  const resetImagePreview = () => {
    setPreviewVisible(false);
    setPreviewImage(null);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
    setMenu(value);
  }

  return (
    <Layout
      title="Government - Admin management"
      titlePage={
        'แก้ไขข่าวจัดซื้อจัดจ้าง ' +
        (tenderData ? tenderData.tender_title : '')
      }
      url={origin}
      indexSubMenu={'1'}
      indexMenu={"sub-1-2"}
      origin={origin}
      props={props}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management/purchase-news',
          breadcrumbName: 'จัดการข่าวจัดซื้อจัดจ้าง',
        },
        {
          path: '/admin/management/purchase-news/add-purchase-news',
          breadcrumbName: 'แก้ไขข่าวจัดซื้อจัดจ้าง',
        }
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
              name="tender_title"
              label="ชื่อประกาศจัดซื้อจัดจ้าง :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อจัดซื้อจัดจ้าง',
                },
              ]}
            >
              <TextArea
                id="#"
                type="text"
                placeholder="ชื่อประกาศจัดซื้อจัดจ้าง"
                className="resize-none border rounded-md"
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="type_tender_id"
              label="ประเภทประกาศ :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกประเภทประกาศ',
                },
              ]}
            >
              <Select
                defaultValue="1"
                onChange={handleChange}
              >
                <Option value="0">เลือก</Option>
                {tender_type ? tender_type.map((object) => {
                  return <Option value={object.tender_type_id}>{object.tendet_type_name}  </Option>
                }) : ""}
              </Select>
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="tender_detail"
              label="รายละเอียด :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกรายละเอียดจัดซื้อจัดจ้าง',
                },
              ]}
            >
              <JoditEditor
                ref={editor}
                value={content}
                config={config.config(user)}
                height={"700px"}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { }}
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="tender_date"
              label="วันที่ลงข่าวจัดซื้อจัดจ้าง :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full "
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกเลือกวันที่ลงการแสดงจัดซื้อจัดจ้าง',
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
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="expire_date"
              label="วันที่สิ้นสุดการแสดงประกาศ :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full "
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกเลือกวันที่สิ้นสุดการแสดงจัดซื้อจัดจ้าง',
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
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="tender_keyword"
              label="Keyword สำหรับทำ SEO :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
            >
              <TextArea
                id="#"
                type="text"
                placeholder="Keyword สำหรับทำ SEO :"
                className="resize-none border rounded-md"
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
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
