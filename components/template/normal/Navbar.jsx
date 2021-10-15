import { MenuOutlined } from '@ant-design/icons';
import { Col, Dropdown, Image, Layout, Menu, Row, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function Navbar({ children, light }) {
  const { Content } = Layout;
  const router = useRouter();
  const { Text } = Typography;

  const menu = (
    <Menu
      className={
        light
          ? 'bg-white w-60 xs:w-60 rounded-md mt-4'
          : 'bg-tbdarkblue w-60 xs:w-60 rounded-md mt-4'
      }
    >
      <Menu.Item className="hover:bg-tborange rounded-sm">
        <Text className={light ? 'text-black' : ''}>ข่าวประชาสัมพันธ์</Text>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-pink-100">
      <div
        className={
          light
            ? 'w-screen h-20 fixed z-50 bg-white'
            : 'w-screen h-28 fixed z-50 bg-pink-400'
        }
      >
        <Row justify="space-around" align="middle" className="w-screen h-full">
          <Col>
            <Row justify="flex justify-around" align="middle">
              <Col>
                <Link href="/template/normal">
                  <Image
                    className="cursor-pointer mt-1"
                    preview={false}
                    src={
                      process.env.PUBLIC_URL +
                      'assets/templateNormal/logoNm.png'
                    }
                    height={70}
                    width={70}
                    //  onClick={() => router.push('/template/normal')}
                  />
                </Link>
              </Col>
              <Col className="pl-8 ">
                <div className="text-2xl">เทศบาลนครหางดง </div>
                <div className="text-lg">Hangdong city</div>
              </Col>
            </Row>
          </Col>
          <Col span={0} xs={{ span: 0, offset: 0 }} xl={{ span: 15, pull: 1 }}>
            <Row justify="flex justify-end" align="middle" className="w-11/12">
              <Col align="center" className="pl-8 cursor-pointer">
                <div className="w-full text-white font-medium text-xl hover:text-black">
                  ข่าวประชาสัมพันธ์
                </div>
              </Col>
              <Col align="center" className="pl-8 cursor-pointer">
                <div className="w-full text-white font-medium text-xl hover:text-black">
                  จัดซื้อจัดจ้าง
                </div>
              </Col>
              <Link href="#Footer">
                <Col
                  align="center"
                  className="pl-8 cursor-pointer hover:text-2xl"
                >
                  <div className="w-full text-white font-medium text-xl hover:text-black">
                    ติดต่อเรา
                  </div>
                </Col>
              </Link>
            </Row>
          </Col>
          <Col
            align="end"
            span={4}
            xs={{ span: 4, pull: 1 }}
            md={{ span: 4, pull: 1 }}
            lg={{ span: 4, pull: 1 }}
            xl={{ span: 0 }}
          >
            <Dropdown trigger="click" overlay={menu} placement="bottomRight">
              <MenuOutlined
                className={light ? 'text-tborange' : 'text-white'}
              />
            </Dropdown>
          </Col>
        </Row>
      </div>
      <Content>{children}</Content>
    </div>
  );
}

export default Navbar;
