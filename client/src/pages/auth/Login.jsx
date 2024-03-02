import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
const Login = () => {
  return (
    <div className="h-screen flex justify-between">
      <div className="border-2 w-full md:w-1/3 flex flex-col h-full justify-center px-10 ">
        <div className=" mt-auto">
          <h1 className="text-center text-5xl font-bold mb-2">H-POS</h1>
          <Form layout="vertical">
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
            <Form.Item name="remember" valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Remember me</Checkbox>
                <Link>Forgot Password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="mt-auto mb-4">
          Don't you have an account?{" "}
          <Link to={"/register"} className="text-blue-500  font-bold text-lg">
            Register
          </Link>{" "}
          now.
        </div>
      </div>
      <div className="hidden md:block w-2/3 bg-[#6c63ff] ">
        <div className=" h-screen">
          <Carousel className=" h-screen flex " autoplay>
            <div className="">
              <img className="w-[500px] h-[500px] mx-auto" src="/slide-1.svg" />
              <h3 className="text-4xl text-white text-center font-bold">
                Responsive
              </h3>
              <p className="text-center text-white mt-5 text-2xl">
                Compatible with all device sizes
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-[500px] h-[500px] mx-auto" src="/slide-2.svg" />
              <h3 className="text-4xl text-white text-center font-bold">
                Responsive
              </h3>
              <p className="text-center text-white mt-5 text-2xl">
                Compatible with all device sizes
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-[500px] h-[500px] mx-auto" src="/slide-3.svg" />
              <h3 className="text-4xl text-white text-center font-bold">
                Responsive
              </h3>
              <p className="text-center text-white mt-5 text-2xl">
                Compatible with all device sizes
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-[500px] h-[500px] mx-auto" src="/slide-4.svg" />
              <h3 className="text-4xl text-white text-center font-bold">
                Responsive
              </h3>
              <p className="text-center text-white mt-5 text-2xl">
                Compatible with all device sizes
              </p>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Login;
