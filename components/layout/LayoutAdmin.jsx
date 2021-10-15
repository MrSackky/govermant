import Head from 'next/head';
import Link from 'next/link';
import { Layout, Menu, Button, Row, Col, Breadcrumb, PageHeader, Image } from 'antd';
/* Components */
import Router, { useRouter } from 'next/router';
import HeaderAdmin from '../header/HeaderAdmin';
import MenuAdmin from '../navigation/MenuAdmin';
import MenuSuperAdmin from '../navigation/MenuSuperAdmin';
// import Footer from '../footer/FooterDefault';
const { Header, Footer, Sider, Content } = Layout;
import { useEffect, useState } from 'react'
import { absoluteUrl, checkIsLogin } from '../../middleware/utils';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  UserOutlined,
  ToolOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;
// import TopicMenu from "./components/TopicMenu";
import TopicMenu from "./../../components/menu/TopicMenu";

// import "./App.css";
//  import "./App.module.css";

import NavBar from "./../../components/NavBar/NavBar";
import SideBar from "./../../components/SideBar/SideBar";

export default function LayoutAdmin({
  children,
  title = 'Government',
  description = 'Next.js with Sequelize | A boilerplate Next.js and Sequelize from dyarfi.github.io',
  keywords = 'Next.js, Sequelize, ORM, JWT, Json Web Tokens, Authentication, Application',
  type = 'object',
  url = '/',
  image = '/nextjs.svg',
  origin = '',
  index,
  props,
  _routes = [],
  indexMenu = "1",
  isMain = false,
  titlePage = "titlePage",
  indexSubMenu = ""
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState(false);
  const [user, setUser] = useState(false);


  const topics = [
    { title: "หน้าหลัก", icon: < DashboardOutlined /> },
    { title: "จัดการหน่วยงาน", icon: < ToolOutlined /> },
    { title: "จัดการข่าวประชาสัมพันธ์", icon: < ToolOutlined /> },
    { title: "จัดการวันหยุดพิเศษ", icon: < ToolOutlined /> },];
  const topics2 = [
    { title: "หน้าหลัก", icon: < DashboardOutlined /> },
    {
      title: "จัดการเนื้อหา", icon: < MailOutlined />,
      children: [
        { title: "ข่าวกิจกรรม", icon: < MailOutlined /> },
        { title: "ข่าวประชาสัมพันธ์", icon: < MailOutlined /> },
        { title: "ข่าวจัดซื้อจัดจ้าง", icon: < MailOutlined /> },
        { title: "ลิงค์หน่วยงานที่เกี่ยวข้อง", icon: < MailOutlined /> },
        { title: "กระดานข่าว", icon: < MailOutlined /> },
        { title: "คลังเอกสาร", icon: < MailOutlined /> },
        { title: "สำรวจความคิดเห็น", icon: < MailOutlined /> },
        { title: "วารสาร", icon: < MailOutlined /> },
        { title: "รายชื่อถวายพระพร", icon: < MailOutlined /> },
      ]
    },
    {
      title: "จัดการเมนู", icon: < MailOutlined />,
      children: [
        { title: "เมนูหลัก", icon: < MailOutlined /> },
        { title: "เมนูรอง", icon: < MailOutlined /> },
      ]
    },
    { title: "ข้อมูลเมนูร้องทุกข์", icon: < MailOutlined /> },
    { title: "ข้อมูลเมนูติดต่อเรา", icon: < MailOutlined /> },
    { title: "รายงานสรุป", icon: < MailOutlined /> },
    {
      title: "ตั้งค่าระบบ", icon: < MailOutlined />,
      children: [
        { title: "ข้อมูลองค์กร(จัดการโลโก้)", icon: < MailOutlined /> },
        { title: "จัดการธีม", icon: < MailOutlined /> },
        { title: "ส่วนหัวเว็บไซต์", icon: < MailOutlined /> },
        { title: "จัดการอื่นๆ", icon: < MailOutlined /> },
      ]
    },
  ];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    gotoPage(key);
    // setContentIndex(+key);
  };

  const gotoPage = (key) => {
    console.log("key")
    console.log(key)
    if (user.type_user == 1) {
      switch (key) {
        case "0":
          Router.push('/admin/dashborad');
          break;
        case "1":
          Router.push('/admin/management-organization');
          break;
        case "2":
          Router.push('/admin/management-information');
          break;
        case "3":
          Router.push('/admin/management-auto-landingpage');
          break;
        default:
          break;
      }
    } else {
      switch (key) {
        case "0":
          Router.push('/admin/dashborad');
          break;
        case "sub-1-0":
          Router.push('/admin/management/activities');
          break;
        case "sub-1-1":
          Router.push('/admin/management/information');
          break;
        case "sub-1-2":
          Router.push('/admin/management/purchase-news');
          break;
        case "sub-1-3":
          Router.push('/admin/management/banner');
          break;
        case "sub-1-4":
          Router.push('/admin/management/webboard');
          break;
        case "sub-1-5":
          Router.push('/admin/management/documents');
          break;
        case "sub-1-6":
          Router.push('/admin/management/polls');
          break;
        case "sub-1-7":
          Router.push('/admin/management/journal');
          break;
        case "sub-1-8":
          Router.push('/admin/management/blessing-list');
          break;
        case "sub-2-0":
          Router.push('/admin/management-menu/primary-menu');
          break;
        case "sub-2-1":
          Router.push('/admin/management-menu/secoundary-menu');
          break;
        case "3":
          Router.push('/admin/management-complain');
          break;
        case "4":
          Router.push('/admin/management-contact');
          break;
        case "5":
          Router.push('/admin/report');
          break;
        case "sub-6-0":
          Router.push('/admin/setting/profile');
          break;
        case "sub-6-1":
          Router.push('/admin/setting/theme');
          break;
        case "sub-6-2":
          Router.push('/admin/setting/cover');
          break;
        case "sub-6-3":
          Router.push('/admin/setting/general');
          break;
        default:
          Router.push('/error-404');
          break;
      }
    }


  };
  const Menu = (
    <TopicMenu
      topics={!user ? [] : user.type_user == 1 ? topics : topics2}
      selectedKey={indexMenu}
      changeSelectedKey={changeSelectedKey}
      selectedSubKey={indexSubMenu}
    />
  );


  useEffect(() => {
    fetchUserLogin()
    // renderKeyMenu(props.asPath);
  }, [])


  const routes2 = [{
    path: 'index',
    breadcrumbName: 'home'
  }, {
    path: 'first',
    breadcrumbName: 'first'
  }, {
    path: 'second',
    breadcrumbName: 'second'
  }];
  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }

  async function fetchUserLogin() {
    const userLogin = await checkIsLogin()
    // console.log(userLogin)
    setUser(userLogin)
  }



  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="h-screen">
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        <meta
          property="twitter:image:src"
          content={`${origin}${image}?v=${Math.floor(Date.now() / 100)}`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />

        <meta
          property="og:image"
          content={`${origin}${image}?v=${Math.floor(Date.now() / 100)}`}
        />
        <meta property="og:site_name" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />

        {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>
        {/* <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"
        /> */}
      </Head>
      {/* <Header />
      <div className="h-14"></div>
      {children}
      <Footer /> */}
      <div className="App">
        <NavBar menu={Menu} user={user} />
        <Layout>
          <SideBar menu={Menu} />
          <Layout.Content className="content w-full">
            {/* {topics[contentIndex]} */}
            <Content className="w-full" style={{ paddingTop: 0, paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem" }}>
              <Row className="w-full">
                <Col span={24} className="pb-0">
                  <Row>
                    {isMain && <>
                      <Col span={12} className="">

                        <Row className="p-1.5 items-center">
                          {/* <UserOutlined className="text-4xl" /> */}
                          <h1 className="mt-4 text-4xl">{titlePage}</h1>
                        </Row>
                      </Col>
                      <Col span={12} className="flex items-center justify-end justify-items-end">
                        <Row className="p-1.5  justify-end justify-items-end pt-8">

                          <Breadcrumb>
                            {_routes.map((obj, index, { length }) => {
                              if (index + 1 === length) { //last element
                                return <span>{obj.breadcrumbName}</span>
                              }
                              return <Breadcrumb.Item href={obj.path} key={index}>
                                <span>{obj.breadcrumbName}</span>
                              </Breadcrumb.Item>

                            })}

                          </Breadcrumb>
                        </Row>
                      </Col>
                    </>}

                    {!isMain && <>
                      <Col span={24} className="">

                        <PageHeader
                          // ghost={false}
                          onBack={() => window.history.back()}
                          title={titlePage}
                          // subTitle="This is a subtitle"
                          extra={[
                            <Breadcrumb>
                              {_routes.map((obj, index, { length }) => {
                                if (index + 1 === length) { //last element
                                  return <span>{obj.breadcrumbName}</span>
                                }
                                return <Breadcrumb.Item href={obj.path} key={index}>
                                  <span>{obj.breadcrumbName}</span>
                                </Breadcrumb.Item>

                              })}

                            </Breadcrumb>,
                          ]}
                        />
                        {/* <Row className="p-1.5 items-center">
    <UserOutlined className="text-4xl" />
    <h1 className="ml-4 mt-4 text-4xl">management activities</h1>
  </Row> */}
                      </Col>
                    </>}

                    {/*  */}
                    {/* <Col span={12} className="flex justify-items-end">
                    <div>

                  </Col> */}
                  </Row>
                </Col>
              </Row>
              <div className="w-full h-full" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {children}
              </div>
            </Content>
          </Layout.Content>
        </Layout>
      </div>

    </div>
  );
}
