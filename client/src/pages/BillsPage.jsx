import React, { useState, useEffect } from "react";
import { Table, Card, Button, Spin } from "antd";
import PrintBill from "../components/Bills/PrintBill";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills } from "../redux/billSlice";
import { getColumnSearchProps } from "../lib/tableSorter";

const BillsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
      ...getColumnSearchProps(
        "customerName",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn
      ),
    },
    {
      title: "Customer PhoneNumber",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      ...getColumnSearchProps(
        "customerPhoneNumber",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn
      ),
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
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (_, record) => <span>{record.totalAmount.toFixed(2)} $</span>,
      sorter: (a, b) => a.totalAmount - b.totalAmount,
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
      {status === "loading" ? (
        <Spin
          size="large"
          className="absolute w-full inset-x-0 mx-auto mt-10"
        />
      ) : (
        <Table
          dataSource={bills}
          columns={columns}
          bordered
          pagination={false}
          rowKey={"_id"}
          scroll={{ x: 1000, y: 600 }}
          className="mb-8"
        />
      )}

      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customer={customer}
      />
    </div>
  );
};

export default BillsPage;
