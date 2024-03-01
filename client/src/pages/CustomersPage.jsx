import React from "react";
import { Table } from "antd";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const CustomersPage = () => {
  return (
    <div className="px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Customers</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
      />
    </div>
  );
};

export default CustomersPage;
