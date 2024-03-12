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
const EditCategories = ({ isModalOpen, setIsEditModalOpen }) => {
  const [editingRow, setEditingRow] = useState({});
  const [form] = Form.useForm();
  const { categories, deleteStatus, editStatus } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(editCategory({ id: editingRow._id, categoryData: values }));
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCategory(id));
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
      render: (_, record) => {
        return (
          <Form.Item className="mb-0">
            <Button type="link" onClick={() => setEditingRow(record)}>
              Edit
            </Button>
            <Button type="text" htmlType="submit">
              Save
            </Button>
            <Button type="text" danger onClick={() => onDelete(record._id)}>
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
          scroll={{ x: 1000, y: 600 }}
        />
      </Form>
    </Modal>
  );
};

export default EditCategories;
