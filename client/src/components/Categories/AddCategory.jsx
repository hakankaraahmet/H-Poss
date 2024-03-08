import React, { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../redux/categorySlice";
import { message } from "antd";

const AddCategory = ({ isModalOpen, setIsAddModalOpen }) => {
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
    }
  }, [addingStatus]);

  return (
    <Modal
      title="Add New Category"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsAddModalOpen(false)}
    >
      {addingError ? (
        <p>{addingError}</p>
      ) : (
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
