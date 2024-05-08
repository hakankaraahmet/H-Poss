import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  editCategory,
  fetchCategories,
  resetDeleteStatus,
  resetEditStatus,
} from "../../redux/categorySlice";
import { fetchProducts } from "../../redux/productSlice";
const EditCategories = ({ isModalOpen, setIsEditModalOpen }) => {
  const [editingRow, setEditingRow] = useState({});
  const [form] = Form.useForm();
  const { categories, deleteStatus, editStatus } = useSelector(
    (state) => state.categories
  );
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(editCategory({ id: editingRow._id, categoryData: values }));
  };

  useEffect(() => {
    dispatch(fetchProducts({ userId: user?.userId }))
  },[isModalOpen])


  const onDelete = (id) => {
    const isCategoryHaveProduct = products?.find(
      (product) => product.categoryId?._id === id
    );
    if (window.confirm("Are you sure?")) {
      if (isCategoryHaveProduct) {
        message.error(
          "There is product with this category. You must delete product first!!!"
        );
      } else {
        dispatch(deleteCategory(id));
      }
    }
  };

  useEffect(() => {
    if (editStatus === "succeeded") {
      message.success("Category is edited successfully");
      setIsEditModalOpen(false);
      dispatch(resetEditStatus());
      dispatch(fetchCategories());
    }
  }, [editStatus]);

  useEffect(() => {
    if (deleteStatus === "succeeded") {
      message.success("Category is deleted successfully");
      setIsEditModalOpen(false);
      dispatch(resetDeleteStatus());
    }
  }, [deleteStatus, setIsEditModalOpen, dispatch]);

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      key: "title",
      width: 150,
      render: (_, record) => {
        return record._id === editingRow._id ? (
          <Form.Item className="mb-0" name="title">
            <Input defaultValue={record.title} />
          </Form.Item>
        ) : (
          <p>{record.title}</p>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 250,
      render: (_, record) => {
        const isEditing = record._id === editingRow._id;
        return (
          <Form.Item className="mb-0 ">
            <Button type="text" onClick={() => setEditingRow(record)}>
              Edit
            </Button>
            {isEditing ? (
              <Button type="text" className="ml-4" htmlType="submit">
                Save
              </Button>
            ) : (
              <Button type="text" className="ml-4" disabled>
                Save
              </Button>
            )}
            <Button
              type="primary"
              className="ml-4"
              danger
              onClick={() => {
                onDelete(record._id);
              }}
            >
              Delete
            </Button>
          </Form.Item>
        );
      },
    },
  ];

  useEffect(() => {
    if (!isModalOpen) {
      setEditingRow({});
      form.resetFields();
    }
  }, [isModalOpen, form]);

  return (
    <Modal
      title="Edit Category"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish} form={form}>
        <Table
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
          bordered
          scroll={{ x: 400, y: 600 }}
        />
      </Form>
    </Modal>
  );
};

export default EditCategories;
