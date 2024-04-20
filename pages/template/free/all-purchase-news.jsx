
import { Divider, Typography } from 'antd';
import React, { useState } from "react";
import Layout from '../../../components/template/free-1/Layout';
import Menu from '../../../components/template/free-1/Menu';
import PurchaseNews from '../../../components/template/free-1/PurchaseNews/index';


const { Title, Text } = Typography;

export default function Template() {


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

  const [activitiesSlider, setActivitiesSlider] = useState([
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

  return (
    <>
      <Layout >
        <Menu />
        <div class="container md:grid xs:flow-root sm:flow-root md:grid-cols-12 gap-8 mx-auto mt-4"
          style={{ alignItems: 'revert' }}

        >

          <div class="md:col-span-12 ">
            <Divider orientation="left"><div class="uppercase tracking-wide text-2xl font-semibold mb-2 ">ข่าวจัดซื้อจัดจ้าง</div></Divider>
            <PurchaseNews news={news} />

          </div>



        </div>


      </Layout>
    </>
  );
}
