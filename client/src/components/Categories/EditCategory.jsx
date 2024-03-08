import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
const EditCategory = ({
  isModalOpen,
  setIsEditModalOpen,
}) => {
  const [editingRow, setEditingRow] = useState({});
  const [form] = Form.useForm();
  const { categories, status } = useSelector((state) => state.categories);
  const onFinish = async (values) => {
    // try {
    //   await fetch(`http://127.0.0.1:8000/categories/${editingRow._id}`, {
    //     method: "PUT",
    //     body: JSON.stringify({ ...values }),
    //     mode: "cors",
    //     credentials: "same-origin",
    //     headers: { "Content-type": "application/json; charset=UTF-8" },
    //   });
    //   message.success("Category is edited successfully");
    //   //ALERT burada daha duzgun bir yapi kur
    //   const updatedCategories = await fetch("http://127.0.0.1:8000/categories");
    //   const updatedCategoriesData = await updatedCategories.json();
    //   setCategories(updatedCategoriesData);
    // } catch (error) {
    //   message.error("Something went wrong :/");
    //   console.log("error :>> ", error);
    // }
    setIsEditModalOpen(false);
  };
  const deleteCategory = async (id) => {
    // if (window.confirm("Are you sure?")) {
    //   try {
    //     await fetch(`http://127.0.0.1:8000/categories/${id}`, {
    //       method: "DELETE",
    //       mode: "cors",
    //       credentials: "same-origin",
    //       headers: { "Content-type": "application/json; charset=UTF-8" },
    //     });
    //     message.success("Category is deleted successfully");
    //     //ALERT burada daha duzgun bir yapi kur
    //     const updatedCategories = await fetch(
    //       "http://127.0.0.1:8000/categories"
    //     );
    //     const updatedCategoriesData = await updatedCategories.json();
    //     setCategories(updatedCategoriesData);
    //   } catch (error) {
    //     message.error("Something went wrong :/");
    //     console.log("error :>> ", error);
    //   }
    // }
  };
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
            <Button
              type="text"
              danger
              onClick={() => deleteCategory(record._id)}
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
        />
      </Form>
    </Modal>
  );
};

export default EditCategory;
