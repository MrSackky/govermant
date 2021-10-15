import { InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Form, Image, Input,
  Modal,
  notification,
  Select,
  Typography,
  Upload
} from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react';
import { apiInstance } from '../../../middleware/utils';
const { Option } = Select;
const { TextArea } = Input;
// const config = require('./../../config');
const config = require('../../../pages/admin/config');
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
const { Text, Title } = Typography;
export default function modal({ fetch, user, pollId, fetchPollQuestionData }) {
  let divRef = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(null)
  const [imageLandingPage, setImageLandingPage] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)

  const onSubmitHandler = async value => {
    const data = {
      organization_id: user.organization_id,
      poll_questions_title: value.poll_questions_title,
      poll_questions_seq: '999999',
      poll_id: pollId
    };
    console.log(data);
    const registerData = await apiInstance().post('/pollmenu', data);
    if (registerData.data.status == 200) {
      openNotificationSuccess();
    } else {
      openNotificationFail(registerData.data.message);
    }
    setVisible(false);
    fetchPollQuestionData();
    onReset();
  };

  const openNotificationSuccess = () => {
    api.success({
      message: `บันทึกมูลสำเร็จ`,
      description: 'บันทึกมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการบันทึกข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };

  const { Dragger } = Upload;

  const onReset = () => {
    resetImagePreview()
    form.resetFields();
  };

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/banner",
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
    <>
      <a
        onClick={() => setVisible(true)}
        className="ml-4 lg:inline-flex lg:w-auto w-full px-2 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-600 hover:text-white"
      >
        เพิ่มหัวเว็บไซต์
      </a>
      {contextHolder}
      <Modal
        title="เพิ่มหัวเว็บไซต์"
        className="mt-4"
        centered
        visible={visible}
        // onOk={() => onOK()}
        onCancel={() => {
          // form.resetFields();
          setVisible(false);
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
        ><Form.Item
          name="##"
          label="ภาพลิงค์หน่วยงานที่เกี่ยวข้อง :"
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกเลือกภาพลิงค์หน่วยงานที่เกี่ยวข้อง',
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
            name="#"
            label="ลิงค์"
            style={{ float: 'left' }}
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกลิงค์ URL',
              },
            ]}
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
            <div className="lg:inline-flex w-full mt-6">
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
