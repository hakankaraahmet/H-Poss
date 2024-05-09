import React, { useState } from "react";
import { Table, Card, Button, message, Popconfirm } from "antd";
import CreateBill from "../components/Carts/CreateBill";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { deleteCart, increaseCart, reduceCart } from "../redux/cartSlice";
import { getColumnSearchProps } from "../lib/tableSorter";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const { cartItems, total, tax } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const taxAmount = (total * tax) / 100;
  const onReduce = (item) => {
    if (item.quantity === 1) {
      if (window.confirm("Are you sure to delete product?")) {
        dispatch(reduceCart(item));
        message.success("Products are deleted successfully");
      }
    } else {
      dispatch(reduceCart(item));
    }
  };
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      width: "8%",
      render: (_, record) => {
        return (
          <img
            src={baseUrl + record?.image[0]}
            alt={record.title}
            className="w-20 h-20 object-contain"
          />
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps(
        "title",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn
      ),
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      render: (_, record) => {
        return <p>{record.categoryId.title}</p>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (_, record) => {
        return <p>{record.price.toFixed(2)} $</p>;
      },
    },
    {
      title: "Product Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => {
        return (
          <div className="flex items-center ">
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => onReduce(record)}
            />
            <span className="font-bold inline-flex text-center w-6 justify-center">
              {record.quantity}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increaseCart(record))}
            />
          </div>
        );
      },
    },
    {
      title: "Total Price",
      render: (_, record) => {
        return <p>{(record.price * record.quantity).toFixed(2)} $</p>;
      },
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => {
              dispatch(deleteCart(record));
              message.success("Product is deleted successfully");
            }}
          >
            <Button type="link" danger>
              {" "}
              Delete
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div className="px-6">
      <Table
        dataSource={cartItems.filter(item => item?.userId === user?.userId)}
        columns={columns}
        bordered
        pagination={false}
        scroll={{ x: 1200, y: 300 }}
        rowKey={"_id"}
      />
      <div className="cart-total flex justify-end my-4 ">
        <Card className="w-full md:w-72 select-none">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{total > 0 ? total.toFixed(2) : 0}$</span>
          </div>
          <div className="flex justify-between my-2">
            <b>VAT %{tax}</b>
            <span className="text-red-700">
              {taxAmount > 0 && "+"}{" "}
              {taxAmount > 0 ? taxAmount.toFixed(2) : taxAmount}$
            </span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-xl">{(total + taxAmount).toFixed(2)}$</span>
          </div>
          <Button
            type="primary"
            className=" w-full mt-4 capitalize select-none"
            size="large"
            onClick={() => setIsModalOpen(true)}
            disabled={cartItems.filter(item => item?.userId._id === user?.userId).length === 0}
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
