
import { Divider, Typography } from 'antd';
import React, { useState } from "react";
import Borads from '../../../components/template/free-1/Borads/index';
import Layout from '../../../components/template/free-1/Layout';
import Menu from '../../../components/template/free-1/Menu';


const { Title, Text } = Typography;

export default function Template() {


  const [news, setNews] = useState([
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
        <Menu />
        <div class="container md:grid xs:flow-root sm:flow-root md:grid-cols-12 gap-8 mx-auto mt-4"
          style={{ alignItems: 'revert' }}

        >

          <div class="md:col-span-12 ">
            <Divider orientation="left"><div class="uppercase tracking-wide text-2xl font-semibold mb-2 ">กระดานข่าว</div></Divider>
            <Borads news={news} />

          </div>



        </div>


      </Layout>
    </>
  );
}
