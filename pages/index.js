import Link from 'next/link';

/* utils */
import { absoluteUrl } from '../middleware/utils';

/* components */
import Layout from '../components/layout/LayoutDefault';
import UserNav from '../components/navigation/User';

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

  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  const contentStyle = {
    height: 'auto',
    textAlign: 'center',
  };

  return (
    <Layout title="Government | Home Page" url={origin} origin={origin}>
      <div>
        <div justify="center" className="bg-gray-100 lg:inline-flex w-full">
          <div className="text-center lg:text-right rounded-r-lg bg-gray-300 lg:px-20 py-24 lg:w-1/2 w-full">
            <Title>ระบบเว็บไซต์หน่วยงานสำเร็จรูป</Title>
            <ul>
              <li>สร้างไซต์หน่วยงานท่านได้ตัวเอง ง่าย เร็ว สวยงาม </li>
              <li>MANAGE YOUR ORGANIZATION , EASY , FAST , BEAUTIFUL</li>
            </ul>
            <button className="lg:inline-flex lg:w-auto px-3 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-300 hover:text-white">
              ทดลองใช้งาน
            </button>
            <br />
            <p className="text-red-500">* สมัครใช้งานวันนี้ทดลองใช้ฟรี 30วัน</p>
          </div>
          <div className="text-left lg:inline-flex px-20 py-8 w-1/2 hidden lg:block">
            <Image
              preview={false}
              src={'assets/images/slidehome.png'}
            />
          </div>
        </div>
      </div>

      <div className="py-14" id="property">
        <div justify="center">
          <Title className="text-center">
            เว็บไซต์หน่วยงานสำเร็จรูป ใช้งานง่าย ไม่ยุ่งยาก
          </Title>
        </div>
        <div justify="center" className="content">
          <ul>
            <p className="text-sm text-center">
              <li>
                GOVERNMENT icti
                เราเป็นเว็บไซต์หน่วยงานสำเร็จรูปสำหรับหน่วยงานราชการ เว็บไซต์
                อปท เช่น เทศบาล องค์การบริหารส่วนตำบล
                โรงพยาบาลส่งเสริมสุขภาพตำบล เป็นต้น
              </li>
              <li>
                สามารถสร้างไซต์หน่วยงานท่านได้ตัวเอง ง่าย เร็ว สวยงาม ไม่ยุ่งยาก
                ครบตามมาตราฐานเว็บไซต์หน่วยงานภาครัฐ
                เป็นระบบที่ถูกออกแบบขึ้นมาเพื่อเป็นเว็บไซต์หน่วยงานราชการต่างๆโดยเฉพาะ
              </li>
              <li>
                ไม่ใช่เว็บไซต์ที่สร้างขึ้นมาด้วย WordPress หรือ แพลตฟอร์มอื่นๆ
                และมีการจัดเก็บข้อมูลบน Cloud ที่เป็นมาตราฐาน
              </li>
            </p>
          </ul>
        </div>
        <div justify="center" className="text-center">
          <div className="lg:inline-flex">
            <div className="text-center lg:w-1/5">
              <ul>
                <li>
                  <Image
                    preview={false}
                    height="86px"
                    width="86px"
                    src={'assets/images/icon1.png'}
                  />
                </li>
                <li>
                  <Text strong>Responsive Website</Text>
                </li>
                <li>
                  <p className="text-gray-400">
                    รองรับหน้าจออุปกรณ์ทุกชนิด แสดงผลได้อย่าง "สมบูรณ์แบบ"
                  </p>
                </li>
              </ul>
            </div>
            <div className="text-center lg:w-1/5">
              <ul>
                <li>
                  <Image
                    preview={false}
                    height="86px"
                    width="86px"
                    src={'assets/images/icon2.png'}
                  />
                </li>
                <li>
                  <Text strong>แก้ไขข้อมูลง่าย</Text>
                </li>
                <li>
                  <p className="text-gray-400">
                    แก้ไขข้อมูลด้วยตัวเอง ไม่ต้องเขียนโปรแกรม
                  </p>
                </li>
              </ul>
            </div>
            <div className="text-center lg:w-1/5">
              <ul>
                <li>
                  <Image
                    preview={false}
                    height="86px"
                    width="86px"
                    src={'assets/images/icon3.png'}
                  />
                </li>
                <li>
                  <Text strong>เว็บไซต์สวย ทันสมัย</Text>
                </li>
                <li>
                  <p className="text-gray-400">
                    TEMPLATE ที่ออกแบบมาอย่างลงตัว มีความเป็นมืออาชีพ
                  </p>
                </li>
              </ul>
            </div>
            <div className="text-center lg:w-1/5">
              <ul>
                <li>
                  <Image
                    preview={false}
                    height="86px"
                    width="86px"
                    src={'assets/images/icon4.png'}
                  />
                </li>
                <li>
                  <Text strong>รองรับการทำ SEO</Text>
                </li>
                <li>
                  <p className="text-gray-400">ให้เว็บไซต์ติดอันดับการค้นหา</p>
                </li>
              </ul>
            </div>
            <div className="text-center lg:w-1/5">
              <ul>
                <li>
                  <Image
                    preview={false}
                    height="86px"
                    width="86px"
                    src={'assets/images/icon5.png'}
                  />
                </li>
                <li>
                  <Text strong>มีทีมงาน support</Text>
                </li>
                <li>
                  <p className="text-gray-400">
                    มีทีมงานให้ความช่วยเหลือ ตลอดการใช้งาน
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="lg:inline-flex lg:w-auto w-1/3 px-3 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-300 hover:text-white">
            ทดลองใช้งาน
          </button>
        </div>
      </div>

      <div className="bg-green-600 pt-10 pb-10">
        <div justify="center" className="text-center">
          <div className="lg:inline-flex">
            <div className="text-right mr-16 hidden lg:block">
              <Image
                preview={false}
                src={'assets/images/feature.png'}
              />
            </div>
            <div className="text-center lg:text-left px-4">
              <p className="text-xl">กระดานข่าว คลังเอกสารราชการ</p>
              <p className="text-sm">
                ระบบกระดานเว็บบอร์ด สำหรับการสนทนาผ่านเว็บบอร์
                และคลังเอกสารสำหรับประชาสัมพันธ์ และให้ประชาชนดาวน์โหลด
              </p>
              <hr />
              <div style={{ margin: '20px 0' }} />
              <p className="text-xl">ประกาศประกวดราคา ข่าวประชาสัมพันธ์</p>
              <p className="text-sm">
                ระบบเพิ่มเนื้อหาเว็บ เพื่อให้ประชาชนเข้าถึงข้อมูล
                ข่าวสารของหน่วยงาน เช่น การประกวดราคา การประชาสัมพันธ์
              </p>
              <hr />
              <div style={{ margin: '20px 0' }} />
              <p className="text-xl">ระบบร้องทุกข์และสำรวจความคิดเห็น</p>
              <p className="text-sm">
                ระบบรับข้อมูลต่างๆ จากประชาชนผู้เข้าชมเว็บไซต์ เช่น การร้องทุกข์
                ระบบสำรวจความคิดเห็น
              </p>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div className="py-14" id="package">
        <div justify="center">
          <Title className="text-center">ตารางเปรียบเทียบแพ็กเกจ</Title>
        </div>

        <div className="mx-auto text-center hidden lg:block">
          <div className="text-center lg:inline-flex lg:flex-row lg:w-auto w-full lg:items-center justify-center items-start  flex flex-col lg:h-auto h-full">
            <div className="mx-auto text-center">
              <div className="mx-auto bg-white rounded-xl shadow w-5/6 h-full">
                <p className="text-xl">Connect</p>
                <h4>Cloud server 50 Mb</h4>
                <hr />
                <ul>
                  <li>● เพิ่ม ลบ แก้ไข เนื้อหาเว็บไซต์ได้ด้วยตัวเอง</li>
                  <li>● เปลี่ยนภาพ Slide กิจกรรมของหน่วยงาน</li>
                  <li>● แสดงหน้าวันสำคัญอัตโนมัติ ตั้งเวลาแสดงผลเนื้อหาได้</li>
                  <li>● Support SEO</li>
                  <li>● ระบบประกวดราคา ข่าวประขาสัมพันธ์</li>
                  <li>● กระดานข่าว คลังเอกสารราชการ</li>
                  <li>● ระบบสถิติผู้เข้าชมเว็บ</li>
                  <li>● Theme เว็บไซต์มาตราฐาน</li>
                  <li>● แสดง โฆษณา</li>
                  <li>● Theme เว็บไซต์มาตราฐาน</li>
                </ul>
                <hr />
                <p className="text-xl">1,800 บาท</p>
                <h4>ต่อปี *ราคารวมภาษีมูลค่าเพิ่มแล้ว</h4>
                <button className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded-full h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-300 hover:text-white mb-2">
                  ขอใบเสนอราคา
                </button>
              </div>
            </div>
            <div>
              <div className="mx-auto rounded-xl shadow w-5/6">
                <p className="text-xl">Standard</p>
                <h4>Cloud server 4GB</h4>
                <hr />
                <ul>
                  <li>● เพิ่ม ลบ แก้ไข เนื้อหาเว็บไซต์ได้ด้วยตัวเอง</li>
                  <li>● เปลี่ยนภาพ Slide กิจกรรมของหน่วยงาน</li>
                  <li>● แสดงหน้าวันสำคัญอัตโนมัติ ตั้งเวลาแสดงผลเนื้อหาได้</li>
                  <li>● Support SEO</li>
                  <li>● ระบบประกวดราคา ข่าวประขาสัมพันธ์</li>
                  <li>● ระบบร้องทุกข์ และสำรวจความคิดเห็น</li>
                  <li>● ระบบสถิติผู้เข้าชมเว็บ</li>
                  <li>● Theme เว็บไซต์มาตราฐาน</li>
                  <li>● ไม่แสดง โฆษณา</li>
                  <li>● Theme เว็บไซต์มาตราฐาน</li>
                </ul>
                <hr />
                <p className="text-xl">5,300 บาท</p>
                <h4>ต่อปี *ราคารวมภาษีมูลค่าเพิ่มแล้ว</h4>
                <button className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded-full h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-300 hover:text-white mb-2">
                  ขอใบเสนอราคา
                </button>
              </div>
            </div>
            <div>
              <div className="mx-auto text-white bg-green-600 rounded-xl shadow w-5/6">
                <p className="text-xl">Premium</p>
                <h4>Cloud server ไม่จำกัด</h4>
                <hr />
                <ul>
                  <li>● จดทะเบียน .com หรือ .go.th</li>
                  <li>● Email @ชื่อเว็บไซค์หน่วยงาน ( 1 Email)</li>
                  <li>● เพิ่ม ลบ แก้ไข เนื้อหาเว็บไซต์ได้ด้วยตัวเอง</li>
                  <li>● เปลี่ยนภาพ Slide กิจกรรมของหน่วยงาน</li>
                  <li>● แสดงหน้าวันสำคัญอัตโนมัติ ตั้งเวลาแสดงผลเนื้อหาได้</li>
                  <li>● Support SEO</li>
                  <li>● ระบบประกวดราคา ข่าวประขาสัมพันธ์</li>
                  <li>● กระดานข่าว คลังเอกสารราชการ</li>
                  <li>● ระบบร้องทุกข์ และสำรวจความคิดเห็น</li>
                  <li>● ระบบสถิติผู้เข้าชมเว็บ</li>
                  <li>● Theme เว็บไซต์มาตราฐาน</li>
                  <li>
                    ● ย้ายข้อมูลพื้นฐานจากเว็บไซต์เดิมมายังเว็บไซต์ใหม่
                    ในครั้งแรก
                  </li>
                  <li>● ไม่แสดงโฆษณา</li>
                </ul>
                <hr />
                <p className="text-xl">7,400 บาท</p>
                <h4>ต่อปี *ราคารวมภาษีมูลค่าเพิ่มแล้ว</h4>
                <button className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded-full h-8 text-white bg-transparent font-bold items-center justify-center hover:bg-green-300 hover:text-white py-2 px-4 border border-white-500 mb-2">
                  ขอใบเสนอราคา
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <Carousel afterChange={onChange}>
            <div>
              <h3 style={contentStyle}>
                <div className="mx-auto text-center">
                  <div className="mx-auto rounded-xl shadow w-3/4 md:w-1/2 sm:w-1/2">
                    <p className="text-xl">Connect</p>
                    <h4>Cloud server 50 Mb</h4>
                    <hr />
                    <ul>
                      <li>● เพิ่ม ลบ แก้ไข เนื้อหาเว็บไซต์ได้ด้วยตัวเอง</li>
                      <li>● เปลี่ยนภาพ Slide กิจกรรมของหน่วยงาน</li>
                      <li>
                        ● แสดงหน้าวันสำคัญอัตโนมัติ ตั้งเวลาแสดงผลเนื้อหาได้
                      </li>
                      <li>● Support SEO</li>
                      <li>● ระบบประกวดราคา ข่าวประขาสัมพันธ์</li>
                      <li>● กระดานข่าว คลังเอกสารราชการ</li>
                      <li>● ระบบสถิติผู้เข้าชมเว็บ</li>
                      <li>● Theme เว็บไซต์มาตราฐาน</li>
                      <li>● แสดง โฆษณา</li>
                      <li>● Theme เว็บไซต์มาตราฐาน</li>
                    </ul>
                    <hr />
                    <p className="text-xl">1,800 บาท</p>
                    <h4>ต่อปี *ราคารวมภาษีมูลค่าเพิ่มแล้ว</h4>
                    <button className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded-full h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-300 hover:text-white mb-2">
                      ขอใบเสนอราคา
                    </button>
                  </div>
                </div>
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <div>
                  <div className="mx-auto rounded-xl shadow w-3/4 md:w-1/2 sm:w-1/2">
                    <p className="text-xl">Standard</p>
                    <h4>Cloud server 4GB</h4>
                    <hr />
                    <ul>
                      <li>● เพิ่ม ลบ แก้ไข เนื้อหาเว็บไซต์ได้ด้วยตัวเอง</li>
                      <li>● เปลี่ยนภาพ Slide กิจกรรมของหน่วยงาน</li>
                      <li>
                        ● แสดงหน้าวันสำคัญอัตโนมัติ ตั้งเวลาแสดงผลเนื้อหาได้
                      </li>
                      <li>● Support SEO</li>
                      <li>● ระบบประกวดราคา ข่าวประขาสัมพันธ์</li>
                      <li>● ระบบร้องทุกข์ และสำรวจความคิดเห็น</li>
                      <li>● ระบบสถิติผู้เข้าชมเว็บ</li>
                      <li>● Theme เว็บไซต์มาตราฐาน</li>
                      <li>● ไม่แสดง โฆษณา</li>
                      <li>● Theme เว็บไซต์มาตราฐาน</li>
                    </ul>
                    <hr />
                    <p className="text-xl">5,300 บาท</p>
                    <h4>ต่อปี *ราคารวมภาษีมูลค่าเพิ่มแล้ว</h4>
                    <button className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded-full h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-300 hover:text-white mb-2">
                      ขอใบเสนอราคา
                    </button>
                  </div>
                </div>
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <div>
                  <div className="mx-auto text-white bg-green-600 rounded-xl shadow w-3/4  md:w-1/2 sm:w-1/2">
                    <p className="text-xl">Premium</p>
                    <h4>Cloud server ไม่จำกัด</h4>
                    <hr />
                    <ul>
                      <li>● จดทะเบียน .com หรือ .go.th</li>
                      <li>● Email @ชื่อเว็บไซค์หน่วยงาน ( 1 Email)</li>
                      <li>● เพิ่ม ลบ แก้ไข เนื้อหาเว็บไซต์ได้ด้วยตัวเอง</li>
                      <li>● เปลี่ยนภาพ Slide กิจกรรมของหน่วยงาน</li>
                      <li>
                        ● แสดงหน้าวันสำคัญอัตโนมัติ ตั้งเวลาแสดงผลเนื้อหาได้
                      </li>
                      <li>● Support SEO</li>
                      <li>● ระบบประกวดราคา ข่าวประขาสัมพันธ์</li>
                      <li>● กระดานข่าว คลังเอกสารราชการ</li>
                      <li>● ระบบร้องทุกข์ และสำรวจความคิดเห็น</li>
                      <li>● ระบบสถิติผู้เข้าชมเว็บ</li>
                      <li>● Theme เว็บไซต์มาตราฐาน</li>
                      <li>
                        ● ย้ายข้อมูลพื้นฐานจากเว็บไซต์เดิมมายังเว็บไซต์ใหม่
                        ในครั้งแรก
                      </li>
                      <li>● ไม่แสดงโฆษณา</li>
                    </ul>
                    <hr />
                    <p className="text-xl">7,400 บาท</p>
                    <h4>ต่อปี *ราคารวมภาษีมูลค่าเพิ่มแล้ว</h4>
                    <button className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded-full h-8 text-white bg-transparent font-bold items-center justify-center hover:bg-green-300 hover:text-white py-2 px-4 border border-white-500 mb-2">
                      ขอใบเสนอราคา
                    </button>
                  </div>
                </div>
              </h3>
            </div>
          </Carousel>
        </div>
      </div>

      <div className="bg-green-600 py-14" id="contact">
        <div className="mx-auto bg-white rounded w-3/4 lg:w-1/2">
          <div className="pt-4 pb-4 pr-4 pl-4">
            <p className="text-xl">ส่งข้อความถึงเรา</p>
            <TextArea
              placeholder="ชื่อ-สกุล"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
            <div style={{ margin: '24px 0' }} />
            <TextArea
              placeholder="Email"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
            <div style={{ margin: '24px 0' }} />
            <TextArea
              placeholder="ข้อความของคุณ..."
              autoSize={{ minRows: 10, maxRows: 15 }}
            />
            <div style={{ margin: '24px 0' }} />
            <button className="uppercase lg:inline-flex lg:w-auto px-3 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-300 hover:text-white">
              Register
            </button>
          </div>
        </div>
      </div>

      {/* <div className="container">
        <main>

          <h1 className="title">
            Sequelize &amp; <a href="https://nextjs.org">Next.js!</a>
          </h1>
          <p className="description">
            <img
              src="/sequelize.svg"
              alt="Sequelize"
              height="120"
              style={{ marginRight: '1rem' }}
            />
            <img src="/nextjs.svg" alt="Next.js" width="160" />
          </p>
          <UserNav props={{ user: user }} />
          <div className="grid">
            <Link href="/user">
              <a className="card">
                <h3>Users &rarr;</h3>
                <p>Listed users of this web application.</p>
              </a>
            </Link>

            <Link href="/post">
              <a className="card">
                <h3>Posts &rarr;</h3>
                <p>Post collection from users of this web application.</p>
              </a>
            </Link>

            <Link href="/job">
              <a className="card">
                <h3>Jobs &rarr;</h3>
                <p>Job Post collection from users of this web application.</p>
              </a>
            </Link>
          </div>
        </main>
      </div> */}
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
