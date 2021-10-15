import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Typography
} from 'antd';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { apiInstance } from '../../../middleware/utils';
const { Option } = Select;
const { TextArea } = Input;
// const config = require('./../../config');
const config = require('../../../pages/admin/config');
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
const { Text, Title } = Typography;
export default function modal({
  _visible,
  hideEditModal,
  fetch,
  user,
  dataEdit,
}) {
  let divRef = useRef(null);
  const [api, contextHolder] = notification.useNotification();

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


      setFields([
        {
          name: ['poll_questions_title'],
          value: !dataEdit ? '' : dataEdit.poll_questions_title,
        },
      ]);
    }
  };

  const onSubmitHandler = async value => {
    const data = {
      poll_questions_title: value.poll_questions_title,
    };
    console.log(data);
    const registerData = await apiInstance().put(
      '/pollmenu/' + (dataEdit ? dataEdit.poll_questions_id : 0),
      data,
    );
    if (registerData.data.status == 200) {
      openNotificationSuccess();
    } else {
      openNotificationFail(registerData.data.message);
    }

    console.log('ON OK');
    fetch();
    hideEditModal();
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

  const onReset = () => {
    setFields([
      {
        name: ['poll_questions_title'],
        value: !dataEdit ? '' : dataEdit.poll_questions_title,
      },
    ]);
  };


  return (
    <>
      {contextHolder}
      <Modal
        title={'แก้ไขคำถาม'}
        className="mt-4"
        centered
        visible={_visible}
        // onOk={() => onOK()}
        onCancel={() => {
          hideEditModal();
          // form.resetFields();
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
        >
          <Form.Item
            name="poll_questions_title"
            label="ชื่อเมนู"
            className="block text-gray-700 text-sm font-bold mb-2 w-2/3"
            style={{ float: 'left' }}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อเมนู',
              },
            ]}
          >
            <Input
              id="#"
              type="text"
              placeholder="ชื่อเมนู"
              className="resize-none border rounded-md"
            />
          </Form.Item>
          <Form.Item
            className="flex mt-6 mb-0 w1/3"
            style={{ marginBottom: 0 }}
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
