import React from 'react';

import { Empty, Table } from 'antd';
import { useCartData } from './CartContex';

const History = () => {
  const { history } = useCartData();

  const columns = [
    {
      title: 'Sr No',
      dataIndex: 'srNumber',
      key: 'srNumber',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => <img src={text} alt={`Dog`} style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => new Date(text).toLocaleString(),
    },
  ];

  const data = history.map((item, index) => ({
    key: index,
    srNumber: index + 1,
    image: item.image,
    date: item.date,
  }));

  return (
    <div>
      <h1 style={{color:"#fff",textAlign:"center"}}>History Page</h1>
      {history && history.length > 0 ? (
      <Table style={{padding:"0 40px"}} columns={columns} dataSource={data} pagination={{ pageSize: 6 }} />
      ): <Empty description="No History"/>}
    </div>
  );
};

export default History;
