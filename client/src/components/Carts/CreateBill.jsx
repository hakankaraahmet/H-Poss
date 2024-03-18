import React, { useEffect, useState } from "react";
import { Form, Modal, Input, Select, Card, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addBill, resetAddStatus } from "../../redux/billSlice";
import { resetCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Common/Loading";
import { fetchUser } from "../../redux/userSlice";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const [showError, setShowError] = useState(false);
  const { cartItems, total, tax } = useSelector((state) => state.cart);
  const { bills, addingStatus, addingError } = useSelector(
    (state) => state.bills
  );
  const { user } = useSelector((state) => state.user);
  const userToken = sessionStorage.getItem("userToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const taxAmount = (total * tax) / 100;

  useEffect(() => {
    dispatch(fetchUser({token: userToken}))
  },[])

  const onFinish = (values) => {
    dispatch(
      addBill({
        ...values,
        subTotal: total,
        tax: taxAmount.toFixed(2),
        totalAmount: (total + taxAmount).toFixed(2),
        cartItems: cartItems,
        userId: user?._id
      })
    );
  };

  useEffect(() => {
    if (addingStatus === "succeeded") {
      message.success("Bill is created successfully");
      dispatch(resetAddStatus());
      dispatch(resetCart());
      form.resetFields();
      navigate("/bills");
      setIsModalOpen(false);
    } else if (addingStatus === "failed") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false); 
      }, 1500);
    }
  }, [addingStatus]);

  console.log("bills :>> ", bills);
  return (
    <Modal
      title="Create Bill"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
    {showError && (
      <div className="flex items-center gap-x-3">
        <span>{addingError}</span> <Loading />
      </div>
    )}
      {!showError && (
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Customer Name"
            name="customerName"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="customerPhoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
            ]}
          >
            <Input
              type="number"
              className="[&::-webkit-inner-spin-button]:appearance-none"
            />
          </Form.Item>
          <Form.Item
            label="Payment"
            name="paymentMethod"
            rules={[
              { required: true, message: "Please select a Payment Method!" },
            ]}
          >
            <Select placeholder="Select a Payment Method">
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="Credit-Card">Credit Card</Select.Option>
            </Select>
          </Form.Item>

          <Card className="w-full select-none">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{total > 0 ? total.toFixed(2) : 0}$</span>
            </div>
            <div className="flex justify-between my-2">
              <b>VAT %{tax}</b>
              <span className="text-red-700">
                {taxAmount > 0 && "+"}{" "}
                {taxAmount > 0 ? taxAmount.toFixed(2) : taxAmount}$
              </span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-xl">{(total + taxAmount).toFixed(2)}$</span>
            </div>
            <Button
              type="primary"
              className=" w-full mt-4 capitalize select-none"
              size="large"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
            >
              Create Order
            </Button>
          </Card>
        </Form>
      )}
    </Modal>
  );
};

export default CreateBill;
