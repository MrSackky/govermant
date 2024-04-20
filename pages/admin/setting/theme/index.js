import { Image, Modal, notification, Select, Typography } from 'antd';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import { absoluteUrl, apiInstance } from '../../../../middleware/utils';

// import { data } from 'autoprefixer';
const { Text, Title } = Typography;
const { Option } = Select;

export default function Home(props) {
  const { user, origin } = props;
  const [url, setUrl] = useState('');
  const [themeData, setThemeData] = useState(null);
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
  const [dataConfirm, setDataConfirm] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { complainId } = router.query;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchThemeData();
  }, []);

  const fetchThemeData = async () => {
    const _themeData = await apiInstance().get('theme?organization_id=' + (user ? user.organization_id : 0));
    setData(_themeData.data.results)
  };

  const showModal = (data) => {
    setDataConfirm(data);
    setVisibleModalConfirm(true)
  };

  const hideModal = () => {
    setVisibleModalConfirm(false)
  };

  const onConfirmTheme = async () => {
    console.log(dataConfirm)
    const data = {
      'theme': dataConfirm.theme_id,
    }
    // console.log(data)
    const registerData = await apiInstance().put('theme/' + (user ? user.organization_id : 0), data);
    if (registerData.data.status == 200) {
      openNotificationSuccess()
      hideModal();
      // fetchOrganizationData();
      // setVisibleModalDelete(false)
      // fetch({ pagination });
    } else {
      openNotificationFail(registerData.data.message)

    }
  }

  const openNotificationSuccess = () => {
    api.success({
      message: `บันทึกมูลสำเร็จ`,
      description: 'บันทึกมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationFail = (messgae) => {
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
        'จัดการธีม'
      }
      url={origin}
      indexMenu={'sub-6-1'}
      indexSubMenu={"6"}
      origin={origin}
      props={props}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management-theme',
          breadcrumbName: 'จัดการธีม',
        },
      ]}
    >
      <div>
        {contextHolder}
        <div className="text-base">
          {
            data.map((theme) => {
              return <div className="flex lg:w-1/4 md:w-1/4 w-full  float-left p-2">
                <div className="flex flex-col p-2  border-2 rounded-sm border-opacity-50 border-gray-300">
                  <Image
                    // width={200}
                    preview={false}
                    src={'..\\..\\..\\uploads\\theme\\' +
                      theme.theme_cover}
                  // style={{
                  //   height: '116px',
                  //   width: 'auto',
                  //   objectFit: 'cover'
                  // }}
                  />
                  <div className="mt-2 pl-2 w-full float-left">
                    <h4>{theme.theme_title}</h4>
                  </div>
                  <div className="flex flex-row">
                    <div className="pl-2 w-1/2 float-left">
                      <a href={'../../' + theme.theme_path} target='_blank'>ดูตัวอย่าง</a>
                    </div>
                    <div className="w-1/2 float-left text-right pr-2" style={{ cursor: 'pointer' }} onClick={() => showModal(theme)} >
                      เลือกธีมนี้
                    </div>
                  </div>

                </div>
              </div>

            })
          }
          {/* <ul>
            <p>{data ? data.theme_title : ''}</p>
          </ul> */}
        </div>
      </div>
      <Modal
        title="คุณต้องเลือกธีมนี้หรือไม่?"
        visible={visibleModalConfirm}
        onOk={onConfirmTheme}
        onCancel={hideModal}
        okText="ตกลง"
        cancelText="ยกเลิก"
        okButtonProps={{
          'type': "primary",
          'danger': false
        }}
      >
        <p>คุณต้องการเลือก "{dataConfirm ? dataConfirm.theme_title : ""}" หรือไม่?  </p>

      </Modal>
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
