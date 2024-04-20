import { InboxOutlined } from '@ant-design/icons';
import {
  Button, Form, Image, Input,
  Modal,
  notification,
  Select, Switch, Typography, Upload
} from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { apiInstance } from '../../../middleware/utils';
const { Option } = Select;
const { TextArea } = Input;
// const config = require('./../../config');
const config = require('../../../pages/admin/config');
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
const { Text, Title } = Typography;
const { Dragger } = Upload;

export default function modal({
  _visible,
  hideEditModal,
  fetch,
  user,
  dataEdit,
}) {
  let divRef = useRef(null);
  const [api2, contextHolder2] = notification.useNotification();
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [imageLandingPage, setImageLandingPage] = useState(null)
  const [active, setActive] = useState(0)
  const [fields, setFields] = useState([
    {
      name: ['intro_title'],
      value: '',
    },
  ]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchEditData();
  }, [dataEdit]);

  const fetchEditData = async () => {
    if (dataEdit) {
      setPreviewImage('..\\..\\..\\uploads\\c-' +
        user.organization_id +
        '\\cover\\' +
        dataEdit.header_image)
      setPreviewVisible(true)
      setImageLandingPage(dataEdit.header_image)
      setActive(dataEdit.is_show ? 1 : 0)
      setFields([
        {
          name: ['header_link'],
          value: !dataEdit ? '' : dataEdit.header_link,
        },
      ]);
    }
  };

  const onSubmitHandler = async value => {
    const data = {
      header_image: imageLandingPage,
      header_link: value.header_link,
      is_show: active,
    };
    console.log(data);
    const registerData = await apiInstance().put(
      '/covermenu/' + (dataEdit ? dataEdit.header_id : 0),
      data,
    );
    // if (registerData.data.status == 200) {
    //   openNotificationSuccess();
    // } else {
    //   openNotificationFail(registerData.data.message);
    // }

    // fetch();
    form.resetFields();
    hideEditModal(registerData.data);
  };

  const openNotificationSuccess = () => {
    api2.success({
      message: `บันทึกมูลสำเร็จ`,
      description: 'บันทึกมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationFail = messgae => {
    api2.error({
      message: `พบปัญหาระหว่างการบันทึกข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };

  const onReset = () => {

    setPreviewImage('..\\..\\..\\uploads\\c-' +
      user.organization_id +
      '\\cover\\' +
      dataEdit.header_image)
    setPreviewVisible(true)
    setImageLandingPage(dataEdit.header_image)
    setActive(dataEdit.is_show ? 1 : 0)

    setFields([
      {
        name: ['header_link'],
        value: !dataEdit ? '' : dataEdit.header_link,
      },
    ]);

    form.resetFields();

  };

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/cover",
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
        // imageLandingPage
        // console.log(res.data.data.list[0]._name)
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
    setPreviewImage('..\\..\\..\\uploads\\c-' +
      user.organization_id +
      '\\cover\\' +
      dataEdit.header_image)
    setPreviewVisible(true)
    setImageLandingPage(dataEdit.header_image)
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
    <>
      {contextHolder2}
      <Modal
        title="แก้ไขหัวเว็บไซต์"
        className="mt-4"
        centered
        visible={_visible}
        // onOk={() => onOK()}
        onCancel={() => {
          // form.resetFields();
          resetImagePreview();
          hideEditModal(false);
        }}
        width={1000}
        footer={null}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onSubmitHandler}
          requiredMark={true}
          form={form}
          fields={fields}
        ><Form.Item
          name="##"
          label="ภาพลิงค์หน่วยงานที่เกี่ยวข้อง :"
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
        // rules={[
        //   {
        //     required: true,
        //     message: 'กรุณากรอกเลือกภาพลิงค์หน่วยงานที่เกี่ยวข้อง',
        //   },
        // ]}
        >
            {/* <Dragger {...dropimg}> */}
            <Dragger
              maxCount={1}
              // listType="picture"
              accept=".jpg, .jpeg, .png"
              {...imageUploadprops}
            >

              {previewVisible && <><Image
                // width={200}
                preview={false}
                src={previewImage}
              />
              </>
              }
              {!previewVisible && <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด
                </p>
              </>
              }
            </Dragger>
          </Form.Item>
          <Form.Item
            name="header_link"
            label="ลิงค์"
            style={{ float: 'left' }}
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
          // rules={[
          //   {
          //     required: true,
          //     message: 'กรุณากรอกลิงค์ URL',
          //   },
          // ]}
          >
            <Input
              id="#"
              type="text"
              placeholder="ลิงค์"
              className="resize-none border rounded-md"
            />
          </Form.Item>
          <Form.Item
            className=" text-gray-700 text-sm font-bold mb-2 w-full"
          >
            <div className="lg:inline-flex text-left w-1/2">
              <Switch
                className="swt-btn"
                checked={active}
                onClick={value => setActive(value ? 1 : 0)}
              />
              <p className="mx-2 text-sm">การแสดงผล</p>

            </div>
            <div className="lg:inline-flex w-1/2 mt-6">
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
            </div>
          </Form.Item>
        </Form>
        <div style={{ float: 'left', clear: 'both' }} ref={divRef}></div>
      </Modal>
    </>
  );
}
