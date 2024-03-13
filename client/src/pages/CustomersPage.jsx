import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "Customer Name",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Phone Number",
    dataIndex: "customerPhoneNumber",
    key: "customerPhoneNumber",
  },
  {
    title: "Transaction date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => <span>{record.createdAt.substring(0, 10)}</span>,
  },
];

const CustomersPage = () => {
  const { bills } = useSelector((state) => state.bills);
  return (
    <div className="px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Customers</h1>
      <Table
        dataSource={bills}
        columns={columns}
        bordered
        pagination={false}
        scroll={{ x: 1000, y: 600 }}
      />
    </div>
  );
};

export default CustomersPage;
