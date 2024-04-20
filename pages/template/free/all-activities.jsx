
import { Divider, Typography } from 'antd';
import React, { useState } from "react";
import Activities from '../../../components/template/free-1/Activities/index';
import ActivitiesSlide from '../../../components/template/free-1/ActivitiesSlider';
import Layout from '../../../components/template/free-1/Layout';
import Menu from '../../../components/template/free-1/Menu';


const { Title, Text } = Typography;

export default function Template() {


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
            <ActivitiesSlide news={activitiesSlider} isHome={false} />
            <Divider />
            <Activities activities={activities} isHome={false} />


          </div>



        </div>


      </Layout>
    </>
  );
}
