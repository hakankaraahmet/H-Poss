import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, resetAddStatus } from "../../redux/productSlice";
import { Loading } from "../Common/Loading";
import { fetchUser } from "../../redux/userSlice";
import ImageUploader from "./ImageUploader";

const AddProduct = ({ isModalOpen, setIsAddModalOpen }) => {
  const [imageFile, setImageFile] = useState();
  const inputRef = useRef(null);
  const [showError, setShowError] = useState(false);
  const { addingStatus, addingError } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    dispatch(fetchUser({ token: userToken }));
  }, []);

  const onFinish = (values) => {
    const selectedCategory = categories.find(
      (item) => item._id === values.categoryId
    );
    dispatch(
      addProduct({
        ...values,
        categoryId: selectedCategory._id,
        image: imageFile,
        userId: user?._id,
      })
    );
    resetInput();
    setImageFile("");
    form.resetFields();
  };

  useEffect(() => {
    if (addingStatus === "succeeded") {
      message.success("Product is added successfully");
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

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Modal
      title="Add New Product"
      open={isModalOpen}
      footer={false}
      onCancel={() => {
        setIsAddModalOpen(false), resetInput(), setImageFile(""), form.resetFields();
      }}
    >
      {showError && (
        <div className="flex items-center gap-x-3">
          <span>{addingError}</span> <Loading />
        </div>
      )}
      {!showError && (
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Product Name"
            name="title"
            rules={[{ required: true, message: "This area can't be empty!" }]}
          >
            <Input placeholder="Please enter a product name" />
          </Form.Item>

          <ImageUploader
            setImageFile={setImageFile}
            imageFile={imageFile}
            inputRef={inputRef}
            isRequired={true}
          />
          <Form.Item
            label="Product Price"
            name="price"
            rules={[{ required: true, message: "This area can't be empty!" }]}
          >
            <Input
              type="number"
              placeholder="Please enter a product price"
              min={0}
              className="[&::-webkit-inner-spin-button]:appearance-none"
            />
          </Form.Item>
          <Form.Item
            label="Category Select"
            name="categoryId"
            rules={[{ required: true, message: "This area can't be empty!" }]}
          >
            <Select
              showSearch
              placeholder="Search a Category"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories.map((category) => ({
                value: category._id,
                label: category.title,
              }))}
              key={JSON.stringify(categories)}
            />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button htmlType="submit" type="primary">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default AddProduct;
