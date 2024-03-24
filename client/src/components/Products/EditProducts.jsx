import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  message,
  Select,
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  editProduct,
  fetchProducts,
  resetDeleteStatus,
  resetEditStatus,
} from "../../redux/productSlice";
import { Loading } from "../Common/Loading";
import { fetchCategories } from "../../redux/categorySlice";
import { UploadOutlined } from "@ant-design/icons";
const EditProducts = () => {
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const { products, deleteStatus, editStatus, editError } = useSelector(
    (state) => state.products
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const onFinish = (values) => {
    const selectedCategory = categories.find(
      (item) => item.title === values.categoryId
    );
    dispatch(
      editProduct({
        id: editingItem._id,
        productData: { ...values, categoryId: selectedCategory._id },
      })
    );
  };

  const onDelete = (id) => {
    const isProductInCart = cartItems?.some((item) => item?._id === id);
    if (window.confirm("Are you sure?")) {
      if (isProductInCart) {
        message.error(
          "This product is in Cart. You must delete product from the cart first!!!"
        );
      } else {
        dispatch(deleteProduct(id));
      }
    }
  };

  useEffect(() => {
    if (deleteStatus === "succeeded") {
      message.success("Product is deleted successfully");
      dispatch(resetDeleteStatus());
    }
  }, [deleteStatus, dispatch]);

  const columns = [
    {
      title: "Product Title",
      dataIndex: "title",
      width: "8%",
      key: "title",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Product Image",
      dataIndex: "image",
      width: "4%",
      render: (_, record) => {
        return (
          <img
            src={baseUrl + record.image[0]}
            alt={record.title}
            className="w-20 h-20 object-contain"
          />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      width: "8%",
      render: (_, record) => {
        return <p>{record.categoryId.title}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      key: "action",
      render: (_, record) => {
        return (
          <Form.Item className="mb-0">
            <Button
              type="link"
              onClick={() => {
                const selectedCategory = categories.find(
                  (item) => item._id === record.categoryId._id
                );
                setEditingItem({
                  ...record,
                  categoryId: selectedCategory?.title,
                });
                setIsEditModalOpen(true);
              }}
            >
              Edit
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
    if (editStatus === "succeeded") {
      message.success("Product is edited successfully");
      dispatch(resetEditStatus());
      dispatch(fetchProducts());
      setIsEditModalOpen(false);
    } else if (editStatus === "failed") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        form.resetFields();
      }, 1500);
    }
  }, [editStatus]);

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        form.setFieldsValue({
          image: info.file,
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (isEditModalOpen) {
      form.setFieldsValue(editingItem);
    }
  }, [isEditModalOpen]);

  return (
    <>
      <Table
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        bordered
        scroll={{ x: 1000, y: 600 }}
      />
      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        footer={false}
        onCancel={() => setIsEditModalOpen(false)}
      >
        {showError && (
          <div className="flex items-center gap-x-3">
            <span>{editError}</span> <Loading />
          </div>
        )}
        {!showError && (
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={editingItem}
          >
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
                <Button icon={<UploadOutlined />}>Change the Image</Button>
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
                options={categories}
              />
            </Form.Item>
            <Form.Item className="flex justify-end mb-0">
              <Button htmlType="submit" type="primary">
                Edit Product
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default EditProducts;
