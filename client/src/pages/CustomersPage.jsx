import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getColumnSearchProps } from "../lib/tableSorter";
import { fetchBills } from "../redux/billSlice";

const CustomersPage = () => {
  const { bills } = useSelector((state) => state.bills);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
      title: "Phone Number",
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
      title: "Transaction date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => <span>{record.createdAt.substring(0, 10)}</span>,
    },
  ];
  return (
    <div className="px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Customers</h1>
      <Table
        dataSource={bills}
        columns={columns}
        bordered
        pagination={false}
        scroll={{ x: 1000, y: 600 }}
        rowKey={"_id"}
      />
    </div>
  );
};

export default CustomersPage;
