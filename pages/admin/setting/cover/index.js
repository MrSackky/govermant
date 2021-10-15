import { Form, Input, notification, Typography, Upload } from 'antd';
import axios from 'axios';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import React, { useEffect, useRef, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
import ModalAddMenu from '../../../../components/managemnet/cover-menu/add-menu';
/* utils */
import {
  absoluteUrl, apiInstance
} from '../../../../middleware/utils';


const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const { Text, Title } = Typography;

const { TextArea } = Input;
const config = require('./../../config');

export default function Home(props) {
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(null)
  const [imageLandingPage, setImageLandingPage] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)


  const [slide, setSlide] = useState(1);
  const slider = () => {
    slide ? setSlide(0) : setSlide(1);
  };

  const [active, setActive] = useState(1);
  const actived = () => {
    active ? setActive(0) : setActive(1);
  };

  const [date, setDate] = useState('');
  const [fields, setFields] = useState([
    {
      name: ['activities_date'],
      value: moment(),
    },
  ]);

  useEffect(() => {
    setDate(moment())
  }, []);

  async function onSubmitHandler(value) {
    console.log("date onSubmitHandler")
    // console.log(date)
    var dateStr = moment(value.activities_date).format()
    const data = {
      organization_id: user.organization_id,
      activities_title: value.activities_title,
      activities_detail: value.activities_detail,
      activities_image: imageLandingPage,
      activities_date: dateStr,
      activities_keyword: value.activities_keyword,
      is_slide: slide,
      status_active: active,
    };
    console.log(dateStr._i)
    console.log(data)
    const addactivitiesData = await apiInstance().post(
      'admin/management/add-activities',
      data,
    );
    if (addactivitiesData.data.status == 200) {
      openNotificationRegisterSuccess();
      setTimeout(function () { //Start the timer
        router.push('/admin/management/activities')
      }.bind(this), 2000)
    } else {
      openNotificationRegisterFail(addactivitiesData.data.message);
    }
  }


  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `เพิ่มกิจกรรมสำเร็จ`,
      description: 'เพิ่มกิจกรรมสำเร็จแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการเพิ่มกิจกรรม`,
      description: messgae,
      placement: 'topRight',
    });
  };

  const { Dragger } = Upload;


  function onChange(value, dateString) {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    setDate(dateString);
  }

  const [form] = Form.useForm();

  const onReset = () => {
    setActive(1)
    setSlide(1)
    resetImagePreview()
    form.resetFields();
    setFields([
      {
        name: ['activities_date'],
        value: moment(),
      },
    ])
  };

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/activities",
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
    customRequest: (options) => {
      const data = new FormData()
      data.append('file', options.file)
      data.append('id', user.type_user == 1 ? "admin" : user.organization_id)
      const config = {
        "headers": {
          "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
        }
      }
      axios.post(options.action, data, config).then((res) => {
        setImageLandingPage(res.data.data.list[0]._name)
        options.onSuccess(res.data, options.file)
      }).catch((err) => {
        console.log(err)
      })

    },
    async onChange(info) {
      const { status } = info.file
      // console.log(user)
      switch (info.file.status) {
        // case "uploading":
        //   nextState.selectedFileList = [info.file];
        //   break;
        case "done":
          if (!info.file.url && !info.file.preview) {
            info.file.preview = await getBase64(info.file.originFileObj);
          }
          setPreviewImage(info.file.url || info.file.preview)
          setPreviewVisible(true)
          break;

        default:
          // error or removed
          resetImagePreview()
      }
      //console.log(info.file)

      // this.setState({
      //   previewImage: file.url || file.preview,
      //   previewVisible: true,
      // });

    },
    onRemove(info) {
      console.log("onRemove")
      console.log(info)
      resetImagePreview()

    }
  }

  const resetImagePreview = () => {
    setPreviewVisible(false)
    setPreviewImage(null)
  }

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
      url={origin}
      origin={origin}
      // user={login}
      indexSubMenu={"1"}
      indexMenu={"sub-6-2"}
      titlePage="ส่วนหัวเว็บไซต์"
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/setting/cover',
          breadcrumbName: 'ส่วนหัวเว็บไซต์',
        },
      ]}
    >
      {contextHolder}
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
      ></link>
      <div>
        <ModalAddMenu fetch={fetch} user={user} />
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
