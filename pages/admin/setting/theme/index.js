import Link from 'next/link';

/* utils */
import { absoluteUrl, checkIsLogin } from '../../../../middleware/utils';

/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react'

import {
  Carousel,
  Row,
  Col,
  Typography,
  Image,
  Button,
  Input,
  Card,
} from 'antd';

const { Text, Title } = Typography;

const { TextArea } = Input;

export default function Home(props) {
  const { user, origin } = props;
  const [login, setLogin] = useState(null)
  const [shouldRun, setShouldRun] = useState(true)

  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  const contentStyle = {
    height: 'auto',
    textAlign: 'center',
  };

  useEffect(() => {
  }, [])



  return (
    <Layout title="Government - Admin management" url={origin} origin={origin} user={login} >
      <div>
        <h1>setting theme</h1>
        <h4>admin/setting/theme/index.js</h4>
      </div>


    </Layout>
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
