import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, resetAddStatus } from "../../redux/productSlice";

const AddProduct = ({ isModalOpen, setIsAddModalOpen }) => {
  const [showError, setShowError] = useState(false);
  const { addingStatus, addingError } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("values :>> ", values);
    const selectedCategory = categories.find(
      (item) => item._id === values.categoryId
    );
    dispatch(addProduct({ ...values, categoryId: selectedCategory._id }));
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
        setShowError(false); // ALERT buraya bir donen circle koyacagim
        form.resetFields();
      }, 1500);
    }
  }, [addingStatus]);


  return (
    <Modal
      title="Add New Product"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsAddModalOpen(false)}
    >
      {showError && <p>{addingError}</p>}
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
            name="img"
            rules={[{ required: true, message: "This area can't be empty!" }]}
          >
            <Input placeholder="Please enter a product image" />
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
