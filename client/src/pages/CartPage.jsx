import React, { useState } from "react";
import { Table, Card, Button } from "antd";
import CreateBill from "../components/Carts/CreateBill";

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
const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="px-6">
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
      />
      <div className="cart-total flex justify-end mt-4">
        <Card className="w-72 select-none">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>90$</span>
          </div>
          <div className="flex justify-between my-2">
            <span>VAT Total %8</span>
            <span className="text-red-600">+10$</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>100$</span>
          </div>
          <Button
            type="primary"
            className=" w-full mt-4 capitalize select-none"
            size="large"
            onClick={() => setIsModalOpen(true)}
          >
            Create Order
          </Button>
        </Card>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default CartPage;
