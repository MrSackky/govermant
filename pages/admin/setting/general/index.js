import { Input, notification, Radio, Typography } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import React, { useEffect, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import {
  absoluteUrl, apiInstance
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
  const [holidayData, setHolidayData] = useState(null);
  const [valuea, setValuea] = React.useState(1);
  const [valueb, setValueb] = React.useState(1);
  const [organizationData, setOrganizationData] = useState(null)

  async function onChangea(e) {
    console.log('radio checked', e.target.value);
    setValuea(e.target.value);
    const data = {
      organization_id: user.organization_id,
      is_use_intro: e.target.value,
    };
    const holidayData = await apiInstance().put(
      '/general', data,
    );
    if (holidayData.data.status == 200) {
      openNotificationRegisterSuccess();
    } else {
      openNotificationRegisterFail(holidayData.data.message);
    }
  }

  useEffect(() => {
    fetchOrganizationData();
  }, []);

  async function onChangeb(e) {
    setValueb(e.target.value);
    const data = {
      organization_id: user.organization_id,
      is_poll_confirm: e.target.value,
    };
    const holidayData = await apiInstance().put(
      '/general', data,
    );
    if (holidayData.data.status == 200) {
      openNotificationRegisterSuccess();
    } else {
      openNotificationRegisterFail(holidayData.data.message);
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


  const fetchOrganizationData = async () => {
    const _organizationData = await apiInstance().get(
      'organization/' + (user ? user.organization_id : 0)
    );
    // setValuea(_organizationData.data.organization.is_use_intro);
    console.log('_organizationData.data.organization.is_use_intro')
    console.log(_organizationData.data.organization.is_use_intro)
    setValuea(_organizationData.data.organization.is_use_intro);
    setValueb(_organizationData.data.organization.is_poll_confirm);
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
      <div className="text-base leading-3">
        <div>
          <div>
            <p className="lg:inline-flex my-2">ระบบแสดงวันหยุดพิเศษอัตโนมัติ :
            </p>
            <Radio.Group onChange={onChangea} value={valuea}>
              <Radio value={1}>ใช้</Radio>
              <Radio value={0}>ไม่ใช้</Radio>
              <Radio value={2}>กำหนดเอง</Radio>
            </Radio.Group>
          </div>
          <div className="lg:inline-flex mb-3">
            <span className="lg:mr-1">
              เช่น วันแม่ วันปิยะมหาราช เป็นต้น
            </span>
            <span className="font-bold underline">
              หมายเหตุ
            </span>
            <span className="lg:mx-1">
              หากเลือก
            </span>
            <span className="font-bold">
              กำหนดเอง
            </span>
            <span className="lg:mx-1">
              ต้องทำการบันทึกก่อนถึงจะสามารถจักการวันหยุดพิเศษได้
            </span>
          </div>
          <div className="py-2">
            <Link href="/admin/setting/general/management-holiday">
              <a
                className="lg:inline-flex text-center lg:w-auto w-full px-2 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-600 hover:text-white"
              >
                จัดการวันหยุดพิเศษ
              </a>
            </Link>
          </div>
          <div className="py-2">
            <p>ยืนยันตัวตนก่อนโหวด ผลสำรวจ : <Radio.Group onChange={onChangeb} value={valueb}>
              <Radio value={1}>ใช้</Radio>
              <Radio value={0}>ไม่ใช้</Radio>
            </Radio.Group>
            </p>
          </div>
        </div>
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
