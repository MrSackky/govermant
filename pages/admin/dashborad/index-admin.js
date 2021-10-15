import Link from 'next/link';

/* utils */
import { absoluteUrl, checkIsLogin, apiInstance, bytesToSize, convertDatetoThaiDate, bytesToMB, getDatediff } from '../../../middleware/utils';

/* components */
import Layout from '../../../components/layout/LayoutAdmin';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react'
import Chart from "react-google-charts";


import {
  Carousel,
  Row,
  Col,
  Typography,
  Image,
  Button,
  Input,
  Card,
  Statistic
} from 'antd';
const { Text, Title } = Typography;

const { TextArea } = Input;

export default function Home(props) {
  const { origin, userInfo } = props;
  const [news, setNews] = useState(null)
  const [packageInfo, setPackageInfo] = useState(null)
  const [sizePackage, setSizePackage] = useState("0 mb")
  const [sizeFree, setSizeFree] = useState(0)
  const [sizeUsed, setSizeUsed] = useState(0)
  const [datediffExpried, setDatediffExpried] = useState(0)
  const [colorExpried, setColorExpried] = useState("bg-green-600")

  const [data, setData] = useState(
    [
      ["Disk used", "Disk free"],
      ["Disk used", 0.05],
      ["Disk free", 49.65]
    ])


  const pieOptions = {
    title: "",
    pieHole: 0.5,
    slices: [
      {
        color: "#2BB673"
      },
      {
        color: "#4d4d4d"
      },
      {
        color: "#007fad"
      },
      {
        color: "#e9a227"
      }
    ],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 14
      }
    },
    tooltip: {
      showColorCode: true
    },
    chartArea: {
      left: 0,
      top: 0,
      width: "100%",
      height: "80%",
    },
    fontName: "Roboto"
  };

  useEffect(() => {

    fetchOrganizationData()
    fetchPackageData()
  }, [])

  const fetchOrganizationData = async () => {
    var _datediffExpried = await getDatediff(userInfo.date_expired)
    console.log("_datediffExpried")
    console.log(_datediffExpried)
    if (parseInt(_datediffExpried) < 0) {
      setColorExpried("bg-red-600")
      console.log("_datediffExpried bg-red-600")

    } else if (parseInt(_datediffExpried) <= 30) {
      setColorExpried("bg-yellow-600")
      console.log("_datediffExpried bg-yellow-600")


    }

    setDatediffExpried(_datediffExpried)
    const _size = bytesToMB(userInfo ? userInfo.size_used : 0)
    setSizeUsed(_size)
    const _newsData = await apiInstance().get(
      'information-news/1'
    );
    setNews(_newsData.data.information_news)
  }

  const fetchPackageData = async () => {

    const _data = await apiInstance().get(
      'package/' + (userInfo ? userInfo.package_id : 0)
    );
    if (_data.data.packageData.size_limit == -1) {
      setSizePackage("UNLIMITED")
    } else {
      const _size = await bytesToSize(_data.data.packageData.size_limit)
      setSizePackage(_size)
      let _sizeFree = await bytesToMB(_data.data.packageData.size_limit)
      let _sizeUsed = await bytesToMB(userInfo ? userInfo.size_used : 0)
      // console.log("_sizeUsed: " + _sizeUsed)
      // console.log("_sizeFree: " + _sizeFree)


      setData(
        [
          ['Pizza', 'Popularity'],
          ['Size Used', parseFloat(_sizeUsed)],
          ['Size Free', parseFloat(_sizeFree)],
        ]
      )
    }
    setPackageInfo(_data.data.packageData)


  }

  return (
    <div>
      <Row>
        <Col span={20} className="p-8">
          <div dangerouslySetInnerHTML={{ __html: news ? news.infor_detail : "" }} />
          {/* {news ? news.infor_detail : ""} */}
        </Col>
        <Col span={4} className="">
          {/* AA{JSON.stringify(userInfo)}BB<br /> */}
          {/* AA{JSON.stringify(packageInfo)}BB */}
          <Row>
            <Col span={24} className={colorExpried + " p-8 rounded-lg text-white"}>
              แพคเกจ: {packageInfo ? packageInfo.name_package : ""} {sizePackage}
              <br />วันหมดอายุ {userInfo ? convertDatetoThaiDate(userInfo.date_expired) : ""}
              <br />({datediffExpried + " วัน"})
            </Col>
          </Row>
          <Row className=" border-green-600 border-2 rounded-lg mt-2">
            <Col span={24} className="mt-2 p-8 pt-2 ">
              พืนที่ใช้ไป {sizeUsed ? (sizeUsed == 'NaN' ? 0 : sizeUsed) : 0} MB<br /><br />
              <Chart
                chartType="PieChart"
                data={data}
                options={pieOptions}
                graph_id="PieChart"
                // width={"90%"}
                // height={"400px"}
                loader={<div>Loading Chart</div>}
                legend_toggle
              />
            </Col>
          </Row>
        </Col>
      </Row >
    </div >
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
