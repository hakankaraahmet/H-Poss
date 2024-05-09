import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, resetAddStatus } from "../../redux/categorySlice";
import { message } from "antd";
import { Loading } from "../Common/Loading";
import { fetchUser } from "../../redux/userSlice";

const AddCategory = ({ isModalOpen, setIsAddModalOpen }) => {
  const [showError, setShowError] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { addingStatus, addingError } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userToken = localStorage.getItem("userToken");

  const onFinish = (values) => {
    dispatch(addCategory({title: values.title, userId: user?._id }));
    form.resetFields();
  };
  useEffect(() => {
    dispatch(fetchUser({token: userToken}))
  },[])

  useEffect(() => {
    if (addingStatus === "succeeded") {
      message.success("Category is added successfully");
      dispatch(resetAddStatus());
      setIsAddModalOpen(false);
    } else if (addingStatus === "failed") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
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
      {showError && (
        <div className="flex items-center gap-x-3">
          <span>{addingError}</span> <Loading />
        </div>
      )}
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
