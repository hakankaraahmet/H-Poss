import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message, Select, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, resetAddStatus } from "../../redux/productSlice";
import { Loading } from "../Common/Loading";
import { fetchUser } from "../../redux/userSlice";
import { UploadOutlined } from "@ant-design/icons";


const AddProduct = ({ isModalOpen, setIsAddModalOpen }) => {
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
        userId: user?._id,
      })
    );
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

  const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        form.setFieldsValue({ // Set the uploaded file to the form field
          image: info.file
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  

  return (
    <Modal
      title="Add New Product"
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
            label="Product Name"
            name="title"
            rules={[{ required: true, message: "This area can't be empty!" }]}
          >
            <Input placeholder="Please enter a product name" />
          </Form.Item>
          <Form.Item
            label="Product Image"
            name="image"
            rules={[{ required: true, message: "This area can't be empty!" }]}
          >
          <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
          </Form.Item>
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
