import React from "react";
import { Form, Modal, Input, Select, Card, Button } from "antd";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Modal
      title="Create Bill"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
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
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your Phone Number!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Payment"
          name="payment"
          rules={[
            { required: true, message: "Please select a Payment Method!" },
          ]}
        >
          <Select placeholder="Select a Payment Method">
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="Credit Card">Credit Card</Select.Option>
          </Select>
        </Form.Item>

        <Card className="w-full select-none">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>90$</span>
          </div>
          <div className="flex justify-between my-2">
            <span>VAT Total %8</span>
            <span className="text-red-600">+10$</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>100$</span>
          </div>
          <div className="flex justify-end">
            <Button
              type="primary"
              className="  mt-4 capitalize select-none"
              size="large"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
            >
              Create Order
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
