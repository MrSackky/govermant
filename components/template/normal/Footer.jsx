import { Row, Typography } from 'antd';

function Footer() {
  const { Text } = Typography;

  return (
    <Row
      justify="center"
      align="bottom"
      className="w-screen py-40 bg-pink-400 "
    >
      <Text className="text-xl text-white font-light">Copyright © 2021</Text>
    </Row>
  );
}

export default Footer;
