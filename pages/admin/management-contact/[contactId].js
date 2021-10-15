import { notification, Select, Switch, Typography } from 'antd';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react';
import validator from 'validator';
/* components */
import Layout from '../../../components/layout/LayoutAdmin';
/* utils */
import { absoluteUrl, apiInstance } from '../../../middleware/utils';

// import { data } from 'autoprefixer';
const { Text, Title } = Typography;
const { Option } = Select;

export default function Home(props) {
  const { user, origin } = props;
  const [url, setUrl] = useState('');
  const [contactData, setContactData] = useState(null);
  const [fields, setFields] = useState([
    {
      name: ['question_title'],
      value: '',
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { contactId } = router.query;
  const [data, setData] = useState('');
  const [active, setActive] = useState(1);
  const actived = () => {
    active ? setActive(0) : setActive(1);
  };
  const validateURL = inputText => {
    setUrl(validator.trim(inputText));
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    const _contactData = await apiInstance().get('contact/' + contactId);
    setData(_contactData.data.contact);
    setActive(_contactData.data.contact.is_done);
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

  async function onChange(active) {
    const data = {
      organization_id: user.organization_id,
      is_done: active,
    };
    const contactData = await apiInstance().put(
      '/contact/' + contactId,
      data
    );
    if (contactData.data.status == 200) {
      openNotificationRegisterSuccess();
      setTimeout(function () { //Start the timer
        router.push('/admin/management-contact')
      }.bind(this), 2000)
    } else {
      openNotificationRegisterFail(contactData.data.message);
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



  return (
    <Layout
      title="Government - Admin management"
      titlePage={
        'แสดงรายละเอียดข้อมูลเมนูติดต่อเรา ' +
        (contactData ? contactData.contact_post : '')
      }
      url={origin}
      indexMenu={'4'}
      origin={origin}
      props={props}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management-contact',
          breadcrumbName: 'จัดการข้อมูลเมนูติดต่อเรา',
        },
        {
          path: '/admin/management-contact/contact',
          breadcrumbName: 'แสดงรายละเอียดข้อมูลเมนูติดต่อเรา',
        },
      ]}
    >
      <div>
        {contextHolder}
        <div className="text-base">
          <ul>
            <p>เรื่องร้องทุกข์ : {data ? data.contact_post : ''}</p>
          </ul>
          <ul>
            <p>รายละเอียด : {data ? data.contact_detail : ''}</p>
          </ul>
          <ul>
            <p>ผู้ร้องทุกข์ : {data ? data.contact_name_posted : ''}</p>
          </ul>
          <ul>
            <p>เบอร์โทร : {data ? data.contact_telephone : ''}</p>
          </ul>
          <ul>
            <p>email : {data ? data.contact_email : ''}</p>
          </ul>
          <ul className="inline-flex">
            <Switch checked={active} onClick={actived} onClick={value => setActive(value ? 1 : 0)} onChange={onChange} />
            <p className="mx-2 text-sm">การดำเนินการ</p>
          </ul>
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
