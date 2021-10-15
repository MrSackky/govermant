import { InboxOutlined } from '@ant-design/icons';
import {
  Button, Form, Image, notification, Row, Select,
  Switch, Typography, Upload
} from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import {
  absoluteUrl, apiInstance
} from '../../../../middleware/utils';

const { Text, Title } = Typography;
const { Option } = Select;

export default function Home(props) {
  const { user, origin } = props;
  const [url, setUrl] = useState('');
  const [bannerData, setBannerData] = useState(null);
  const [active, setActive] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageLandingPage, setImageLandingPage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fields, setFields] = useState([
    {
      name: ['banner_title'],
      value: '',
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { bannerId } = router.query;
  const { Dragger } = Upload;

  async function onSubmitHandler(value) {
    // console.log("value")
    // console.log(value)
    const data = {
      organization_id: user.organization_id,
      banner_title: value.banner_title,
      banner_image: imageLandingPage,
      banner_link: value.banner_link,
      status_active: active,
      num_click: '0',
      seq: '0',
      is_deleted: '0',
    };
    // console.log(data)
    const registerData = await apiInstance().put('/banner/' + bannerId, data);
    if (registerData.data.status == 200) {
      openNotificationRegisterSuccess();
      fetchBannerData();
      setTimeout(
        function () {
          //Start the timer
          router.push('/admin/management/banner');
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
    fetchBannerData();
  }, []);

  const onResetForm = () => {
    setActive(bannerData.status_active == 1 ? 1 : 0);
    setFields([
      {
        name: ['banner_title'],
        value: bannerData.banner_title,
      },
      {
        name: ['banner_image'],
        value: bannerData.banner_image,
      },
      {
        name: ['banner_link'],
        value: bannerData.banner_link,
      },
      {
        name: ['status_active'],
        value: bannerData.status_active,
      },
    ]);
  };
  const fetchBannerData = async () => {
    const _bannerData = await apiInstance().get('banner/' + bannerId);
    setPreviewImage(
      '..\\..\\..\\uploads\\c-' +
      (user ? user.organization_id : 0) +
      '\\banner\\' +
      _bannerData.data.banners.banner_image,
    );
    setPreviewVisible(true);
    setImageLandingPage(_bannerData.data.banners.banner_image);
    setActive(_bannerData.data.banners.status_active);
    setFields([
      {
        name: ['banner_title'],
        value: _bannerData.data.banners.banner_title,
      },
      {
        name: ['banner_image'],
        value: _bannerData.data.banners.banner_image,
      },
      {
        name: ['banner_link'],
        value: _bannerData.data.banners.banner_link,
      },
      {
        name: ['status_active'],
        value: _bannerData.data.banners.status_active,
      },
    ]);
  };


  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: '/api/upload/banner',
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
        'แก้ไขลิ้งหน่วยงานที่เกี่ยวข้อง ' +
        (bannerData ? bannerData.banner_title : '')
      }
      url={origin}
      indexSubMenu={"1"}
      indexMenu={"sub-1-3"}
      origin={origin}
      props={props}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management/banner',
          breadcrumbName: 'จัดการลิ้งหน่วยงานที่เกี่ยวข้อง',
        },
        {
          path: '/admin/management/add-banner',
          breadcrumbName: 'แก้ไขลิ้งหน่วยงานที่เกี่ยวข้อง',
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
              name="banner_title"
              label="ชื่อลิงค์หน่วยงานที่เกี่ยวข้อง"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อลิงค์หน่วยงานที่เกี่ยวข้อง',
                },
              ]}
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="ชื่อลิงค์หน่วยงานที่เกี่ยวข้อง"
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="banner_link"
              label="ที่อยู่ url"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกที่อยู่ url',
                },
              ]}
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="ที่อยู่ url"
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="banner_image"
              label="ภาพปกลิงค์หน่วยงานที่เกี่ยวข้อง :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกเลือกภาพปกลิงค์หน่วยงานที่เกี่ยวข้อง',
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
            <Form.Item className="flex mt-6">
              <div className="lg:inline-flex w-full">
                <div className="lg:inline-flex text-left w-1/2">
                  <Switch
                    className="swt-btn"
                    checked={active}
                    onClick={value => setActive(value ? 1 : 0)}
                  />
                  <p className="mx-2 text-sm">สถานะการใช้งาน</p>
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
