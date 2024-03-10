import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../redux/categorySlice";
import { message } from "antd";

const AddCategory = ({ isModalOpen, setIsAddModalOpen }) => {
  const [showError, setShowError] = useState(false);
  const { addingStatus, addingError } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(addCategory(values));
    form.resetFields();
  };

  useEffect(() => {
    if (addingStatus === "succeeded") {
      message.success("Category is added successfully");
      setIsAddModalOpen(false);
    } else if (addingStatus === "failed") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false); // ALERT buraya bir donen circle koyacagim
        form.resetFields();
      }, 1500);
    }
  }, [addingStatus]);
  

  return (
    <Modal
      title="Add New Category"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsAddModalOpen(false)}
    >
      {showError && <p>{addingError}</p>}
      {!showError && (
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Add Category"
            name="title"
            rules={[{ required: true, message: "This area can't be empty!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button htmlType="submit" type="primary">
              Add Category
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default AddCategory;
