import { BackTop } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { Header } from '../../../components/template/normal/contents';
import Footer from '../../../components/template/normal/Footer';
import Navbar from '../../../components/template/normal/Navbar';
// import '../../../styles/templateBasic.scss';
import styles from '../../../styles/templateBasic.module.scss';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.fontChulabhorn}>
      <Navbar className={styles.ice}>
        <div id="Header">
          <Header />
        </div>
        <div id="Footer">
          <Footer />
        </div>
        <BackTop duration={50} onClick={() => router.push('#')} />
      </Navbar>
    </div>
  );
}
