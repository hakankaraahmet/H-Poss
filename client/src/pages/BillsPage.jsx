import React, { useState } from "react";
import { Table, Card, Button } from "antd";
import PrintBill from "../components/Bills/PrintBill";

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

const BillsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Bills</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
      />
      <div className="cart-total flex justify-end mt-4">
        <Card className="w-72 select-none">

          <Button
            type="primary"
            className=" w-full mt-4 capitalize select-none"
            size="large"
            onClick={() => setIsModalOpen(true)}
          >
            Print
          </Button>
        </Card>
      </div>
      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default BillsPage;
