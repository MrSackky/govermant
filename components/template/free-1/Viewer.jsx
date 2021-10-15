// import styles from '../../../styles/templateBasic.module.scss';
import { LikeOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Statistic } from 'antd';
export default function Viewer({ news }) {

  return (
    <Row gutter={24}
      style={{
        backgroundColor: "rgb(209 250 229)",
        marginTop: "15px",
        // marginLeft: "10px",
        // marginRight: "10px",
        padding: "10px"
      }}
    >
      <Col span={24} >
        <Statistic title="ผู้เข้าชมวันนี้" value={9999} prefix={<LikeOutlined />} />
        <Divider style={{ marginTop: "15px", marginBottom: "15px" }} />
        <p class="text-center ">ผู้เข้าชมเดือนนี้ 99999</p>
        <p class="text-center ">ผู้เข้าชมทั้งหมด 99999</p>
      </Col>
    </Row>
  )
}
