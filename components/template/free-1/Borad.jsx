import { Divider, Table } from 'antd';
// import styles from '../../../styles/templateBasic.module.scss';

export default function Borad({ borads }) {
  const columns = [
    {
      title: 'กระทู้',
      dataIndex: 'question_title',
      key: 'question_title',
      render: question_title => <a>{question_title}</a>,
    },
    {
      title: 'ดู',
      dataIndex: 'question_num',
      key: 'question_num',
      width: '5%',
    },
    {
      title: 'ตอบ',
      dataIndex: 'answer_num',
      key: 'answer_num',
      width: '5%',
    },

  ]
  return (
    <div className="w-full" style={{
      marginBottom: '25px',

    }}>
      <Divider orientation="left" style={{ marginBottom: "0px" }}><div class="uppercase tracking-wide text-2xl  font-semibold mb-2 ">กระดานข่าว</div></Divider>
      <Table columns={columns} dataSource={borads} pagination={false} style={{ marginBottom: "15px" }} />

      <p class="text-right"><a href="#" class="ml-1 mt-1 text-sm leading-tight font-medium text-black hover:underline">กระดานข่าวทั้งหมด</a></p>

    </div>
  )
}
