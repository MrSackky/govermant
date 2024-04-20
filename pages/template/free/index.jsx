
import { Divider, Image, Typography } from 'antd';
import React, { useState } from "react";
import ActivitiesSlide from '../../../components/template/free-1/ActivitiesSlider';
import Banners from '../../../components/template/free-1/Banners';
import Borad from '../../../components/template/free-1/Borad';
import Covers from '../../../components/template/free-1/Cover';
import Layout from '../../../components/template/free-1/Layout';
import Menu from '../../../components/template/free-1/Menu';
import News from '../../../components/template/free-1/NewsSection';
import PurchaseNews from '../../../components/template/free-1/PurchaseNewsSection';
import Viewer from '../../../components/template/free-1/Viewer';

const { Title, Text } = Typography;

export default function Template() {
  const [covers, setCover] = useState([
    '\\images\\templates\\free-1\\banner-1.png',
    '\\images\\templates\\free-1\\banner-1.png',
  ]);

  const [activities, setActivities] = useState([
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    }

  ]);
  const [news, setNews] = useState([
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    }

  ]);

  const [purchaseNews, setPurchaseNews] = useState([
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    }

  ]);

  const [banners, setBanners] = useState([
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    }
    ,
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    }
    ,
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    }
    ,
    {
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    }

  ]);
  const [borads, setBorads] = useState([
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    }

  ]);
  return (
    <>
      <Layout >
        <Covers banners={covers} />
        <Menu />
        <div class="container md:grid xs:flow-root sm:flow-root md:grid-cols-12 gap-8 mx-auto mt-4"
          style={{ alignItems: 'revert' }}

        >

          <div class="md:col-span-10 ">
            <ActivitiesSlide news={activities} isHome={true} />
            <News news={news} />
            <PurchaseNews news={purchaseNews} />

          </div>
          <div class="md:col-span-2 pt-8 text-center">

            <Image
              // width={200}
              preview={false}
              className="md:w-full sm:w-1/3"
              src={"\\images\\templates\\free-1\\member-1.png"}
            /><br />
            <Title className="text-center" level={5}>h4. Ant Design</Title>
            <Text className="text-center" >Ant Design (default)</Text>
            <Divider />
            <Image
              // width={200}
              preview={false}
              className="w-full"
              src={"\\images\\templates\\free-1\\member-2.png"}
            /><br />
            <Title className="text-center" level={5}>h4. Ant Design</Title>
            <Text className="text-center" >Ant Design (default)</Text>
            <Divider />
            <Image
              // width={200}
              preview={false}
              className="w-full"
              src={"\\images\\templates\\free-1\\member-3.png"}
            /><br />
            <Title className="text-center" level={5}>h4. Ant Design</Title>
            <Text className="text-center" >Ant Design (default)</Text>
            <Viewer />
          </div>


        </div>
        <div
          class="w-full"
          style={{
            // backgroundColor: "rgb(223 223 223)"
            // marginTop: "25px"
          }}
        >
          <div class="container md:grid-cols-12 gap-8 mx-auto mt-4"
            style={{ alignItems: 'revert', minHeight: 'auto' }}

          >
            <Borad borads={borads} />

          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgb(223 223 223)"
            // , marginTop: "25px"
          }}
        >

          <div class="container md:grid xs:flow-root sm:flow-root md:grid-cols-12 gap-8 mx-auto mt-4"
            style={{ alignItems: 'revert', minHeight: 'auto' }}

          >

            <div class="md:col-span-12 ">
              <Banners banners={banners} />
            </div>

          </div>

        </div>


      </Layout>
    </>
  );
}
