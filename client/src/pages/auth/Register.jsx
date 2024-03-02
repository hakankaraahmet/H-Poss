import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/Auth/AuthCarousel";

const Register = () => {
  return (
    <div className="h-screen flex justify-between">
      <div className=" w-full md:w-1/3 flex flex-col h-full justify-center px-10 ">
        <div className=" mt-auto">
          <h1 className="text-center text-5xl font-bold mb-2">H-POS</h1>
          <Form layout="vertical">
            <Form.Item
              label="Please Enter Username"
              name="username"
              rules={[{ required: true, message: "Username can't be empty!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Please Enter Email"
              name="email"
              rules={[{ required: true, message: "Email can't be empty!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Please Enter Password"
              name="password"
              rules={[{ required: true, message: "Password can't be empty!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Please Enter Password Again"
              name="passwordAgain"
              rules={[{ required: true, message: "Password can't be empty!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="mt-auto mb-4">
          Have you got already an account?{" "}
          <Link to={"/login"} className="text-blue-500  font-bold text-lg">
            Login
          </Link>{" "}
          now.
        </div>
      </div>
      <div className="hidden md:block w-2/3 bg-[#6c63ff] relative ">
        <AuthCarousel />
      </div>
    </div>
  );
};

export default Register;
