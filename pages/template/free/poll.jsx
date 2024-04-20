
import { Divider, Typography } from 'antd';
import React, { useState } from "react";
import Layout from '../../../components/template/free-1/Layout';
import Menu from '../../../components/template/free-1/Menu';
import Poll from '../../../components/template/free-1/Polls/poll';


const { Title, Text } = Typography;

export default function Template() {


  const [news, setNews] = useState([
    {
      no: 1,
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      no: 2,
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      no: 3,
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      no: 4,
      title: "title",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
    },
    {
      no: 5,
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
            <Divider orientation="left"><div class="uppercase tracking-wide text-2xl font-semibold mb-2 "><a href='/template/free/all-polls'>สำรวจความคิดเห็น</a></div></Divider>
            <Poll news={news} />

          </div>



        </div>


      </Layout>
    </>
  );
}
