/* components */
import {
  notification
} from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import indexPage from '../404';
// pages/404.js
import { apiInstance } from '../../middleware/utils';
import ErrorPage from '../404';


export default function UrlSlug() {
  const router = useRouter();
  const { urlSlug } = router.query;
  const [api, contextHolder] = notification.useNotification();
  const [loding, setLoding] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  // const [INDEXPAGE, setINDEXPAGE] = useState(null)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await apiInstance().post(
      'organization/search-by-url/' + urlSlug,
    );
    console.log(data);
    if (data.data.status != 200) {
      // setTimeout(async function () { //Start the timer
      //   await router.push('/404')
      // }.bind(this), 2000)
      setError(true)
    } else {
      // INDEXPAGE = '../'
      setData(data.data)
    }

    setLoding(false)
  }

  // const IndexPageComponent = (theme) => dynamic(() => import(`../${theme}/index`), {
  //   ssr: false,
  //   loading: () => <p>Loading...</p>,
  // });

  const fetchIndexPage = (theme) => {
    var template = 'template/free';
    // const IndexPage = IndexPageComponent(template);
    // const IndexPage = dynamic(() => import('../template/free/index'));
    const newPath = `../${template}/index.jsx`;
    const IndexPage = dynamic(() => import(`../${template}/index.jsx`), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    });
    // const IndexPage = dynamic(() => import(`../${template}/index`), {
    //   ssr: false,
    //   loading: () => <p>Loading...</p>,
    // })
    return <IndexPage />

  }

  return (
    <>
      {loding == false && <>
        {error == true && <>
          <ErrorPage />
        </>}

        {error == false && fetchIndexPage(data.theme)}
      </>}

    </>
  );
}
