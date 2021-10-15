import { InboxOutlined } from '@ant-design/icons';
import {
  Button, DatePicker, Form, Image, notification, Row, Select,
  Switch, Typography, Upload
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useRef, useState } from 'react';
import validator from 'validator';
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
  const [activitiesData, setActivitiesData] = useState(null);
  const [active, setActive] = useState(1);
  const [slide, setSlide] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageLandingPage, setImageLandingPage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fields, setFields] = useState([
    {
      name: ['activities_title'],
      value: '',
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { activitiesId } = router.query;
  const { Dragger } = Upload;
  const config = require('./../../config');
  const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
  const editor = useRef(null);
  const [content, setContent] = useState('');

  async function onSubmitHandler(value) {
    // console.log("value")
    // console.log(value)

    var dateStr = moment(value.activities_date).format();

    const data = {
      organization_id: user.organization_id,
      activities_title: value.activities_title,
      activities_detail: value.activities_detail,
      activities_image: imageLandingPage,
      activities_date: dateStr,
      activities_keyword: value.activities_keyword,
      is_slide: slide,
      status_active: active,
      is_deleted: '0',
    };
    // console.log(data)
    const registerData = await apiInstance().put(
      '/activities/' + activitiesId,
      data,
    );
    if (registerData.data.status == 200) {
      openNotificationRegisterSuccess();
      fetchActivitiesData();
      setTimeout(
        function () {
          //Start the timer
          router.push('/admin/management/activities');
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
  const validateURL = inputText => {
    setUrl(validator.trim(inputText));
  };

  useEffect(() => {
    fetchActivitiesData();
  }, []);

  const onResetForm = () => {
    setActive(activitiesData.status_active == 1 ? 1 : 0);
    setSlide(activitiesData.is_slide == 1 ? 1 : 0);
    setFields([
      {
        name: ['activities_title'],
        value: activitiesData.activities_title,
      },
      {
        name: ['activities_detail'],
        value: activitiesData.activities_detail,
      },
      {
        name: ['activities_image'],
        value: activitiesData.activities_image,
      },
      {
        name: ['activities_date'],
        value: moment(
          convertDateDBtoDatePickerWithTime(
            activitiesData.activities_date,
          ),
        ),
      },
      {
        name: ['activities_keyword'],
        value: activitiesData.activities_keyword,
      },
      {
        name: ['is_slide'],
        value: activitiesData.is_slide,
      },
      {
        name: ['status_active'],
        value: activitiesData.status_active,
      },
    ]);
  };
  const fetchActivitiesData = async () => {
    const _activitiesData = await apiInstance().get(
      'activities/' + activitiesId,
    );
    // console.log(_activitiesData.data.activities.activities_date);
    // console.log(
    //   convertDateDBtoDatePickerWithTime(
    //     _activitiesData.data.activities.activities_date,
    //   ),
    // );
    setActivitiesData(_activitiesData.data.activities)
    setActive(_activitiesData.data.activities.status_active);
    setSlide(_activitiesData.data.activities.is_slide)
    setPreviewImage(
      '..\\..\\..\\uploads\\c-' +
      user.organization_id +
      '\\activities\\' +
      _activitiesData.data.activities.activities_image,
    );
    setPreviewVisible(true);
    setImageLandingPage(_activitiesData.data.activities.activities_image);
    // console.log(_activitiesData.data.activities.activities_date);
    setFields([
      {
        name: ['activities_title'],
        value: _activitiesData.data.activities.activities_title,
      },
      {
        name: ['activities_detail'],
        value: _activitiesData.data.activities.activities_detail,
      },
      {
        name: ['activities_image'],
        value: _activitiesData.data.activities.activities_image,
      },
      {
        name: ['activities_date'],
        value: moment(
          convertDateDBtoDatePickerWithTime(
            _activitiesData.data.activities.activities_date,
          ),
        ),
      },
      {
        name: ['activities_keyword'],
        value: _activitiesData.data.activities.activities_keyword,
      },
      {
        name: ['is_slide'],
        value: _activitiesData.data.activities.is_slide,
      },
      {
        name: ['status_active'],
        value: _activitiesData.data.activities.status_active,
      },
    ]);
  };
  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: '/api/upload/activities',
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

  return (
    <Layout
      title="Government - Admin management"
      titlePage={
        'แก้ไขข่าวกิจกรรม ' +
        (activitiesData ? activitiesData.activities_title : '')
      }
      url={origin}
      indexSubMenu={"1"}
      indexMenu={"sub-1-0"}
      origin={origin}
      props={props}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management/activities',
          breadcrumbName: 'จัดการข่าวกิจกรรม',
        },
        {
          path: '/admin/management/add-activities',
          breadcrumbName: 'แก้ไขข่าวกิจกรรม',
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
              name="activities_title"
              label="ชื่อข่าวกิจกรรม"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อข่าวกิจกรรม',
                },
              ]}
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="ชื่อข่าวกิจกรรม"
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="activities_detail"
              label="รายละเอียด"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              style={{ textAlign: 'left !important' }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกรายละเอียดข่าวกิจกรรม',
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
              name="activities_image"
              label="ภาพปกข่าวกิจกรรม :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกเลือกภาพปกข่าวกิจกรรม',
                },
              ]}
            >
              {/* <Dragger {...dropimg}> */}
              <Dragger
                maxCount={1}
                // listType="picture"
                accept=".jpg, .jpeg, .png"
                {...imageUploadprops}
              >
                {previewVisible && (
                  <>
                    <Image
                      // width={200}
                      preview={false}
                      src={previewImage}
                    />
                  </>
                )}
                {!previewVisible && (
                  <>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด
                    </p>
                  </>
                )}
              </Dragger>
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="activities_date"
              label="วันที่ลงข่าวกิจกรรม"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              style={{ textAlign: 'left !important' }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกเลือกวันที่ลงข่าวกิจกรรม',
                },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ format: 'HH:mm:ss' }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // showTime={{ defaultValue: moment('00:00:00') }}
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="activities_keyword"
              label="Keyword สำหรับทำ SEO"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                size="large"
                placeholder="Email"
              // onChange={() => setEmailText(event.target.value)}
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item className="flex mt-6">
              <div className="lg:inline-flex w-full">
                <div className="lg:inline-flex text-left w-1/2">
                  <Switch
                    className="swt-btn"
                    checked={slide}
                    onClick={value => setSlide(value ? 1 : 0)}
                  />
                  <p className="mx-2 text-sm">ต้องการนำขึ้น Slide</p>

                  <Switch
                    className="swt-btn"
                    checked={active}
                    onClick={value => setActive(value ? 1 : 0)}
                  />
                  <p className="mx-2 text-sm">การแสดงผล</p>

                  {/*
                  <ul>
                <li className="inline-flex">
                <Switch checked={slide} onClick={slider} />
                <p className="mx-2 text-sm">ต้องการนำขึ้น Slide</p>
                </li>
                <li className="inline-flex">
                <Switch checked={active} onClick={actived} />
                <p className="mx-2 text-sm">การแสดงผล</p>
                </li>
                </ul> */}
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
