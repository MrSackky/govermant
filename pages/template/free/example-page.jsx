
import { Divider, Typography } from 'antd';
import React, { useState } from "react";
import Layout from '../../../components/template/free-1/Layout';
import Menu from '../../../components/template/free-1/Menu';


const { Title, Text } = Typography;

export default function Template() {

  const [data, setData] = useState('<h2 style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; margin: 0px 0px 0.5em; padding: 0px; font-size: inherit; font-weight: 500; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Taj Mahal: A breathtaking ode to love<img src="/images/templates/free-1/tajmahal-b15aed2c99.jpg" alt="Taj Mahal illustration." style="box-sizing: border-box; border-width: 0px; border-style: none; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; vertical-align: middle; max-width: 100%; height: 395px; float: right; width: 614px;" title="Taj Mahal with its poetic white marble tomb"></h2>' +
    '<p style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; margin: 0px 0px 1em; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">No trip to India is complete without visiting this spectacular monument,<span>&nbsp;</span><strong style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; font-weight: bolder;">counted among the Seven Wonders of the World</strong>.</p>' +
    '<p style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; margin: 0px 0px 1em; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Tourists frequently admit that Taj Mahal "simply cannot be described with words". And that’s probably true. The more you try the more speechless you become. Words give only a semblance of truth. The real truth about its beauty is revealed when you adore<span>&nbsp;</span><strong style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; font-weight: bolder;">different shades of “Taj” depending on the time of the day</strong><span>&nbsp;</span>or when you admire the exquisite inlay work in different corners of the façade.</p>' +
    '<h3 style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; margin: 0px 0px 0.5em; padding: 0px; font-size: inherit; font-weight: 500; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Masterpiece of the world’s heritage</h3>' +
    '<p style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; margin: 0px 0px 1em; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Taj Mahal is a mausoleum built in Agra between 1631 and 1648 by Emperor Shah Jahan<span>&nbsp;</span><strong style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; font-weight: bolder;">in the memory of his beloved wife</strong>, Mumtaz Mahal, whose body lies there. It took 20 000 workers to complete and the excellence of this building is visible in every brick.</p>' +
    '<p style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; margin: 0px 0px 1em; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">In 1983, Taj Mahal was appointed UNESCO World Heritage Site for being "the jewel of Muslim art in India and one of the universally admired masterpieces of the world' + "'" + 's heritage".</p>' +
    '<p style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; margin: 0px 0px 1em; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">If you like having a methodology for visiting historical places, here are the four elements on which we recommend to focus your attention:</p>' +
    '<ul style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; list-style: none; margin: 0px 0px 1em; padding: 0px; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">' +
    '<li style = "box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;" > The tomb</li >' +
    '<li style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;">The Decorations</li>' +
    '<li style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;">The Garden</li>' +
    '<li style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000;">The Outlying buildings</li>' +
    '</ul > <p><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;  orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">As the story is set in Japan, one of our core objectives was to capture the essence of Japanese culture and translate it through visual and musical tools. Our digital artist and motion designer did their best at creating and animating a hundred unique illustrations. But this was only half of the job. We all know how much depends on good sound design. This is especially true for films without speech where music is largely responsible for creating the right atmosphere and emotional context. That’s why we spared no effort in composing a powerful soundtrack going through multiple iterations and using various music instruments including some authentic Japanese ones. As a result, we got a tune that could tell the story on its own, which added a lot of impact to the overall effect the film creates.</span></p> ' +
    '<p><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;  orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">As the story is set in Japan, one of our core objectives was to capture the essence of Japanese culture and translate it through visual and musical tools. Our digital artist and motion designer did their best at creating and animating a hundred unique illustrations. But this was only half of the job. We all know how much depends on good sound design. This is especially true for films without speech where music is largely responsible for creating the right atmosphere and emotional context. That’s why we spared no effort in composing a powerful soundtrack going through multiple iterations and using various music instruments including some authentic Japanese ones. As a result, we got a tune that could tell the story on its own, which added a lot of impact to the overall effect the film creates.</span></p>' +
    '<p><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;  orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">As the story is set in Japan, one of our core objectives was to capture the essence of Japanese culture and translate it through visual and musical tools. Our digital artist and motion designer did their best at creating and animating a hundred unique illustrations. But this was only half of the job. We all know how much depends on good sound design. This is especially true for films without speech where music is largely responsible for creating the right atmosphere and emotional context. That’s why we spared no effort in composing a powerful soundtrack going through multiple iterations and using various music instruments including some authentic Japanese ones. As a result, we got a tune that could tell the story on its own, which added a lot of impact to the overall effect the film creates.</span></p>' +
    '<p><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;  orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">As the story is set in Japan, one of our core objectives was to capture the essence of Japanese culture and translate it through visual and musical tools. Our digital artist and motion designer did their best at creating and animating a hundred unique illustrations. But this was only half of the job. We all know how much depends on good sound design. This is especially true for films without speech where music is largely responsible for creating the right atmosphere and emotional context. That’s why we spared no effort in composing a powerful soundtrack going through multiple iterations and using various music instruments including some authentic Japanese ones. As a result, we got a tune that could tell the story on its own, which added a lot of impact to the overall effect the film creates.</span></p>' +
    '<p><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;  orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;  text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">As the story is set in Japan, one of our core objectives was to capture the essence of Japanese culture and translate it through visual and musical tools. Our digital artist and motion designer did their best at creating and animating a hundred unique illustrations. But this was only half of the job. We all know how much depends on good sound design. This is especially true for films without speech where music is largely responsible for creating the right atmosphere and emotional context. That’s why we spared no effort in composing a powerful soundtrack going through multiple iterations and using various music instruments including some authentic Japanese ones. As a result, we got a tune that could tell the story on its own, which added a lot of impact to the overall effect the film creates.</span></p>')
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

          <div class="md:col-span-12 mb-4">
            <Divider orientation="left"><div class="uppercase tracking-wide text-2xl font-semibold mb-2 ">หน้าตัวอย่าง</div></Divider>


            <div dangerouslySetInnerHTML={{ __html: data ? data : "" }} />

          </div>



        </div>


      </Layout>
    </>
  );
}
