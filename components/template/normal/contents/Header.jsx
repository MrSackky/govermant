import { Col, Image, Row, Typography } from 'antd';
import React from 'react';

function Header() {
  const { Text } = Typography;

  return (
    <div className="container mx-auto">
      <Row align="middle" className="w-full">
        <Row className="w-full">
          <Col span={24} md={14} justify="center" className="mt-4 p-2 lg:p-8">
            <Row justify="center" className="text-center">
              <Text className="sm:text-5xl  text-xl font-bold uppercase">
                เทศบาลนครหางดง
              </Text>
            </Row>

            <Row justify="center" className="mt-4">
              <Text className="mt-8 sm:text-4xl  text-lg text-center whitespace-pre-line">
                “นครแห่งวัฒนธรรม เลิศล้ำประเพณีล้านนา เปี่ยมสุขปวงประชา
                งามล้ำค่านครพิงค์."
              </Text>
            </Row>
          </Col>
          <Col span={24} md={10} className="flex justify-center">
            <Image
              className="bottom-0 right-0 mt-2"
              preview={false}
              src={process.env.PUBLIC_URL + 'assets/templateNormal/logoNm.png'}
              width={'70%'}
            />
          </Col>
        </Row>
      </Row>
    </div>
  );
}

export default Header;
