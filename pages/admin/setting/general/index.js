import { Col, Input, notification, Radio, Row, Typography } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import React, { useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import {
  absoluteUrl
} from '../../../../middleware/utils';


const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const { Text, Title } = Typography;

const { TextArea } = Input;
const config = require('./../../config');

export default function Home(props) {
  const [content, setContent] = useState('')
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const router = useRouter();
  const [valuea, setValuea] = React.useState(1);
  const [valueb, setValueb] = React.useState(1);

  const onChangea = e => {
    console.log('radio checked', e.target.value);
    setValuea(e.target.value);
  };
  const onChangeb = e => {
    console.log('radio checked', e.target.value);
    setValueb(e.target.value);
  };

  return (
    <Layout
      title="Government - Admin management"
      url={origin}
      origin={origin}
      // user={login}
      indexSubMenu={"1"}
      indexMenu={"sub-6-3"}
      titlePage="จัดการอื่นๆ"
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/setting/general',
          breadcrumbName: 'จัดการอื่นๆ',
        },
      ]}
    >
      {contextHolder}
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
      ></link>
      <Row className="text-base leading-3">
        <Col>
          <Row>
            <p>ระบบแสดงวันหยุดพิเศษอัตโนมัติ : <Radio.Group onChange={onChangea} value={valuea}>
              <Radio value={0}>ใช้</Radio>
              <Radio value={1}>ไม่ใช้</Radio>
              <Radio value={2}>กำหนดเอง</Radio>
            </Radio.Group>
            </p>
          </Row>
          <Row className="inline-flex">
            <p>
              <span>
                เช่น วันแม่ วันปิยะมหาราช เป็นต้น
              </span>
              <span className="font-bold underline">
                หมายเหตุ
              </span>
              <span>
                หากเลือก กำหนดเอง ต้องทำการบันทึกก่อน
              </span>
              <span className="font-bold">
                กำหนดเอง
              </span>
              <span>
                ต้องทำการบันทึกก่อนถึงจะสามารถจักการวันหยุดพิเศษได้
              </span>
            </p>
          </Row>
          <Row>
            <Link href="#">
              <a
                className="lg:inline-flex text-center lg:w-auto w-full px-2 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-600 hover:text-white"
              >
                จัดการวันหยุดพิเศษ
              </a>
            </Link>
          </Row>
          <Row>
            <p>ยืนยันตัวตนก่อนโหวด ผลสำรวจ : <Radio.Group onChange={onChangeb} value={valueb}>
              <Radio value={0}>ใช้</Radio>
              <Radio value={1}>ไม่ใช้</Radio>
            </Radio.Group>
            </p>
          </Row>
        </Col>
      </Row>
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
