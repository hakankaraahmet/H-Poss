import React, { useState, useEffect } from "react";
import { Table, Card, Button } from "antd";
import PrintBill from "../components/Bills/PrintBill";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills } from "../redux/billSlice";

const BillsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { bills, status } = useSelector((state) => state.bills);
  const [customer, setCustomer] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBills());
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Customer PhoneNumber",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Creation Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <span>{text.substring(0, 10)}</span>,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (_, record) => <span>{record.totalAmount.toFixed(2)} $</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Button
          className="pl-0"
          type="link"
          onClick={() => {
            setCustomer(record), setIsModalOpen(true);
          }}
        >
          Print
        </Button>
      ),
    },
  ];

  return (
    <div className="px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Bills</h1>
      <Table dataSource={bills} columns={columns} bordered pagination={false} />

      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customer={customer}
      />
    </div>
  );
};

export default BillsPage;
