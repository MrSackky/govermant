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
  const [totalActivities, setTotalActivities] = useState(0);
  const [totalActivitiesDaily, setTotalActivitiesDaily] = useState(0);
  const [totalActivitiesMonthly, setTotalActivitiesMonthly] = useState(0);

  const [totalInformation, setTotalInformation] = useState(0);
  const [totalInformationDaily, setTotalInformationDaily] = useState(0);
  const [totalInformationMonthly, setTotalInformationMonthly] = useState(0);

  const [totalTender, setTotalTender] = useState(0);
  const [totalTenderDaily, setTotalTenderDaily] = useState(0);
  const [totalTenderMonthly, setTotalTenderMonthly] = useState(0);

  const [totalComplain, setTotalComplain] = useState(0);
  const [totalComplainDaily, setTotalComplainDaily] = useState(0);
  const [totalComplainMonthly, setTotalComplainMonthly] = useState(0);

  const [totalContact, setTotalContact] = useState(0);
  const [totalContactDaily, setTotalContactDaily] = useState(0);
  const [totalContactMonthly, setTotalContactMonthly] = useState(0);

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
    const reportActivities = await apiInstance().get(
      'activities/report?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalActivities(reportActivities.data.totalCount)

    const reportActivitiesDaily = await apiInstance().get(
      'activities/report-daily?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalActivitiesDaily(reportActivitiesDaily.data.totalCount)

    const reportActivitiesMonthly = await apiInstance().get(
      'activities/report-monthly?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalActivitiesMonthly(reportActivitiesMonthly.data.totalCount)
    // setData(addactivitiesData.data.results);
    // setPagination({
    //   ...params.pagination,
    //   total: addactivitiesData.data.totalCount,
    //   // 200 is mock data, you should read it from server
    //   // total: data.totalCount,
    // });
    // setLoading(false);

    const reportInformation = await apiInstance().get(
      'information/report?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalInformation(reportInformation.data.totalCount)

    const reportInformationDaily = await apiInstance().get(
      'information/report-daily?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalInformationDaily(reportInformationDaily.data.totalCount)

    const reportInformationMonthly = await apiInstance().get(
      'information/report-monthly?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalInformationMonthly(reportInformationMonthly.data.totalCount)

    const reportTender = await apiInstance().get(
      'purchase-news/report?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalTender(reportTender.data.totalCount)

    const reportTenderDaily = await apiInstance().get(
      'purchase-news/report-daily?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalTenderDaily(reportTenderDaily.data.totalCount)

    const reportTenderMonthly = await apiInstance().get(
      'purchase-news/report-monthly?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalTenderMonthly(reportTenderMonthly.data.totalCount)

    const reportComplain = await apiInstance().get(
      'complain/report?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalComplain(reportComplain.data.totalCount)

    const reportComplainDaily = await apiInstance().get(
      'complain/report-daily?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalComplainDaily(reportComplainDaily.data.totalCount)

    const reportComplainMonthly = await apiInstance().get(
      'complain/report-monthly?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalComplainMonthly(reportComplainMonthly.data.totalCount)

    const reportContact = await apiInstance().get(
      'contact/report?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalContact(reportContact.data.totalCount)

    const reportContactDaily = await apiInstance().get(
      'contact/report-daily?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalContactDaily(reportContactDaily.data.totalCount)

    const reportContactMonthly = await apiInstance().get(
      'contact/report-monthly?organization_id=' +
      (user ? user.organization_id : 0)
    );
    setTotalContactMonthly(reportContactMonthly.data.totalCount)
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
          <div className="lg:w-1/3 lg:mr-2 py-2">
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
          <div className="lg:w-1/3 lg:mr-2 py-2">
            <div className="bg-blue-300 w-full rounded-xl">
              <div className="px-2 py-2">
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวกิจกรรมวันนี้</p>
                  <p className="text-right w-1/2 text-4xl">{totalActivitiesDaily}</p>
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
                  <p className="text-right w-1/2">{totalActivitiesMonthly}</p>
                </div>
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวกิจกรรมทั้งหมด</p>
                  <p className="text-right w-1/2">{totalActivities}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 lg:mr-2 py-2">
            <div className="bg-indigo-700 w-full rounded-xl">
              <div className="px-2 py-2">
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวประชาสัมพันธ์วันนี้</p>
                  <p className="text-right w-1/2 text-4xl">{totalInformationDaily}</p>
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
                  <p className="text-right w-1/2">{totalInformationMonthly}</p>
                </div>
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวประชาสัมพันธ์ทั้งหมด</p>
                  <p className="text-right w-1/2">{totalInformation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:inline-flex w-full text-white">
          <div className="lg:w-1/3 lg:mr-2 py-2">
            <div className="bg-purple-500 w-full rounded-xl">
              <div className="px-2 py-2">
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวจัดซื้อจัดจ้างวันนี้</p>
                  <p className="text-right w-1/2 text-4xl">{totalTenderDaily}</p>
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
                  <p className="text-right w-1/2">{totalTenderMonthly}</p>
                </div>
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ข่าวจัดซื้อจัดจ้างทั้งหมด</p>
                  <p className="text-right w-1/2">{totalTender}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 lg:mr-2 py-2">
            <div className="bg-gray-500 w-full rounded-xl ">
              <div className="px-2 py-2">
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ร้องทุกข์วันนี้</p>
                  <p className="text-right w-1/2 text-4xl">{totalComplainDaily}</p>
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
                  <p className="text-right w-1/2">{totalComplainMonthly}</p>
                </div>
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ร้องทุกข์ทั้งหมด</p>
                  <p className="text-right w-1/2">{totalComplain}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 lg:mr-2 py-2">
            <div className="bg-green-500 w-full rounded-xl">
              <div className="px-2 py-2">
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ติดต่อเราวันนี้</p>
                  <p className="text-right w-1/2 text-4xl">{totalContactDaily}</p>
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
                  <p className="text-right w-1/2">{totalContactMonthly}</p>
                </div>
                <div className="inline-flex w-full">
                  <p className="text-left w-1/2">ติดต่อเราทั้งหมด</p>
                  <p className="text-right w-1/2">{totalContact}</p>
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
