import { Input, notification, Typography } from 'antd';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react';
/* components */
import Layout from '../../../components/layout/LayoutAdmin';
/* utils */
import {
  absoluteUrl,
  apiInstance
} from '../../../middleware/utils';

const { Text, Title } = Typography;

const { TextArea, Search } = Input;

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const [login, setLogin] = useState(null);
  const [shouldRun, setShouldRun] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const [filters, setFilters] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    var _filters = [];
    pagination.filters = _filters;
    fetch({ pagination });
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter);
    setPagination({
      pageSize: pagination.pageSize,
      current: pagination.current,
    });
    setFilters(filters.package);
    fetch({
      sortField: sorter.columnKey,
      sortOrder: sorter.order,
      pagination,
      filters: filters.package,
    });
  };
  const onSearch = async _search => {
    setLoading(true);
    setSearch(_search);
    setPagination({
      pageSize: pagination.pageSize,
      current: 1,
    });
    const addactivitiesData = await apiInstance().get(
      'complain?organization_id=' +
      (user ? user.organization_id : 0) +
      '&results=' +
      pagination.pageSize +
      '&page=1&search=' +
      _search +
      '&filters=' +
      filters,
    );

    setData(addactivitiesData.data.results);
    setLoading(false);
  };
  const fetch = async (params = {}) => {
    setLoading(true);
    const addactivitiesData = await apiInstance().get(
      'complain?organization_id=' +
      (user ? user.organization_id : 0) +
      '&results=' +
      params.pagination.pageSize +
      '&page=' +
      params.pagination.current +
      '&search=' +
      search +
      '&sortField=' +
      params.sortField +
      '&sortOrder=' +
      params.sortOrder +
      '&filters=' +
      params.filters,
    );

    setData(addactivitiesData.data.results);
    setPagination({
      ...params.pagination,
      total: addactivitiesData.data.totalCount,
      // 200 is mock data, you should read it from server
      // total: data.totalCount,
    });
    setLoading(false);
  };

  const showModal = data => {
    console.log('data deleted');
    console.log(data);
    setDataDelete(data);
    setVisibleModalDelete(true);
  };

  const hideModal = () => {
    setVisibleModalDelete(false);
  };

  const onDeleteOrganization = async () => {
    // console.log('DELETE')
    // const data = {
    //   'organization_name': value.organization_name,
    // }
    // console.log(data)
    const registerData = await apiInstance().delete(
      'complain/' + dataDelete.complain_id,
      {},
    );
    if (registerData.data.status == 200) {
      openNotificationSuccess();
      // fetchOrganizationData();
      setVisibleModalDelete(false);
      fetch({ pagination });
    } else {
      openNotificationFail(registerData.data.message);
    }
  };

  const openNotificationSuccess = () => {
    api.success({
      message: `ลบข้อมูลสำเร็จ`,
      description: 'ลบข้อมูลสำเร็จ',
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
  return (
    <Layout
      key={'home-complain'}
      titlePage={'รายงานสรุป'}
      title="Government - Admin management"
      url={origin}
      origin={origin}
      isMain={true}
      indexMenu={'5'}
      user={login}
      props={props}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/report',
          breadcrumbName: 'รายงานสรุป',
        },
      ]}
    >
      <div>
        {contextHolder}
        <div className="lg:inline-flex w-full text-white">
          <div className="lg:w-1/4 lg:mr-2 py-2">
            <div className="bg-blue-900 w-full rounded-xl">
              <div className="px-2 py-2">
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ผู้เข้าดูวันนี้</p>
                  <p className="text-right w-1/2 text-4xl">1111</p>
                </div>
                {/* <div className="inline-flex w-1/2 text-right"><p>111</p></div> */}
                <hr
                  style={{
                    backgroundColor: '#C4C4C4',
                    height: 2,
                    width: '100%',
                  }}
                  className="my-4"
                />
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ผู้เข้าดูเดือนนี้</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ผู้เข้าทั้งหมด</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 lg:mr-2 py-2">
            <div className="bg-blue-300 w-full rounded-xl">
              <div className="px-2 py-2">
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวกิจกรรมวันนี้</p>
                  <p className="text-right w-1/2 text-4xl">1111</p>
                </div>
                {/* <div className="inline-flex w-1/2 text-right"><p>111</p></div> */}
                <hr
                  style={{
                    backgroundColor: '#C4C4C4',
                    height: 2,
                    width: '100%',
                  }}
                  className="my-4"
                />
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวกิจกรรมเดือนนี้</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวกิจกรรมเดือนนี้</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 lg:mr-2 py-2">
            <div className="bg-indigo-700 w-full rounded-xl">
              <div className="px-2 py-2">
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวประชาสัมพันธ์วันนี้</p>
                  <p className="text-right w-1/2 text-4xl">1111</p>
                </div>
                {/* <div className="inline-flex w-1/2 text-right"><p>111</p></div> */}
                <hr
                  style={{
                    backgroundColor: '#C4C4C4',
                    height: 2,
                    width: '100%',
                  }}
                  className="my-4"
                />
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวประชาสัมพันธ์ดือนนี้</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวประชาสัมพันธ์ทั้งหมด</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 lg:mr-2 py-2">
            <div className="bg-purple-500 w-full rounded-xl">
              <div className="px-2 py-2">
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวจัดซื้อจัดจ้างวันนี้</p>
                  <p className="text-right w-1/2 text-4xl">1111</p>
                </div>
                {/* <div className="inline-flex w-1/2 text-right"><p>111</p></div> */}
                <hr
                  style={{
                    backgroundColor: '#C4C4C4',
                    height: 2,
                    width: '100%',
                  }}
                  className="my-4"
                />
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวจัดซื้อจัดจ้างเดือนนี้</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวจัดซื้อจัดจ้างทั้งหมด</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:inline-flex w-full text-white">
          <div className="lg:w-1/4 lg:mr-2 py-2">
            <div className="bg-gray-500 w-full rounded-xl ">
              <div className="px-2 py-2">
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ร้องทุกข์วันนี้</p>
                  <p className="text-right w-1/2 text-4xl">1111</p>
                </div>
                {/* <div className="inline-flex w-1/2 text-right"><p>111</p></div> */}
                <hr
                  style={{
                    backgroundColor: '#C4C4C4',
                    height: 2,
                    width: '100%',
                  }}
                  className="my-4"
                />
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ร้องทุกข์เดือนนี้</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ร้องทุกข์ทั้งหมด</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 lg:mr-2 py-2">
            <div className="bg-green-500 w-full rounded-xl">
              <div className="px-2 py-2">
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ติดต่อเราวันนี้</p>
                  <p className="text-right w-1/2 text-4xl">1111</p>
                </div>
                {/* <div className="inline-flex w-1/2 text-right"><p>111</p></div> */}
                <hr
                  style={{
                    backgroundColor: '#C4C4C4',
                    height: 2,
                    width: '100%',
                  }}
                  className="my-4"
                />
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ติดต่อเราเดือนนี้</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ร้องทุกข์ทั้งหมด</p>
                  <p className="text-right w-1/2">1111</p>
                </div>
              </div>
            </div>
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
