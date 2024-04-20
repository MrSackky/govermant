
import { Button, Divider, Form, Input, Typography } from 'antd';
import React from "react";
import Layout from '../../../components/template/free-1/Layout';
import Menu from '../../../components/template/free-1/Menu';


const { TextArea } = Input;

const { Title, Text } = Typography;

export default function Template() {



  return (
    <>
      <Layout >
        <Menu />
        <div class="container md:grid xs:flow-root sm:flow-root md:grid-cols-12 gap-8 mx-auto mt-4"
          style={{ alignItems: 'revert' }}

        >

          <div class="md:col-span-12 mb-4">
            <Divider orientation="left"><div class="uppercase tracking-wide text-2xl font-semibold mb-2 ">ติดต่อเรา</div></Divider>


            <Form
              name="basic"
              layout="vertical"
              // onFinish={onSubmitHandler}
              requiredMark={true}
            // form={form}
            // fields={fields}
            >
              <Form.Item
                name="activities_title"
                label="หัวข้อ :"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกหัวข้อ',
                  },
                ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="หัวข้อ"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>


              <Form.Item
                name="activities_title"
                label="รายละเอียด :"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกรายละเอียด',
                  },
                ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="รายละเอียด"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 20, maxRows: 80 }}
                />
              </Form.Item>
              <Form.Item
                name="name"
                label="ชื่อผู้ติดต่อ"
                className="block text-gray-700 text-sm font-bold mb-2 sm:w-full md:w-1/3 form-organization"
                style={{ textAlign: "left !important" }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อผู้ติดต่อ!'
                  }
                ]}
              >
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" size="large" placeholder="ชื่อผู้ติดต่อ"
                // onChange={() => setEmailText(event.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label="เบอร์โทร"
                className="block text-gray-700 text-sm font-bold mb-2 sm:w-full md:w-1/3 form-organization"
                style={{ textAlign: "left !important" }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอก เบอร์โทร!'
                  },
                ]}
              >
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="#"
                  type="text"
                  placeholder="เบอร์โทร"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="อีเมลล์"
                className="block text-gray-700 text-sm font-bold mb-2 sm:w-full md:w-1/3 form-organization"
                style={{ textAlign: "left !important" }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอก อีเมลล์!'
                  },
                ]}
              >
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="#"
                  type="text"
                  placeholder="อีเมลล์"
                />
              </Form.Item>
            </Form>
            <Button
              // type="primary"
              style={{
                backgroundColor: '#059669',
                borderColor: '#059669',
                height: 40,
                width: 110,
                // marginBottom: '0px !important',
                color: 'white !important',
                marginBottom: '0px',
                marginTop: '10px',
              }}
              htmlType="submit"
              className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/4"
            >
              <Text className="text-custom-white ">ส่งเรื่อง</Text>
            </Button>
          </div>



        </div>


      </Layout>
    </>
  );
}
