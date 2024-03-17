import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/Auth/AuthCarousel";
import { useDispatch, useSelector } from "react-redux";
import { register, resetStatus } from "../../redux/userSlice";

const Register = () => {
  const { user, status, error } = useSelector((state) => state.user);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    dispatch(register(values));
  };

  useEffect(() => {
    if (status === "succeeded") {
      message.success("User is created successfully");
      dispatch(resetStatus());
      form.resetFields();
      setLoading(false);
      navigate("/login");
    } else if (status === "failed") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false); // ALERT buraya bir donen circle koyacagim
        setLoading(false);
        dispatch(resetStatus());
      }, 1500);
    }
  }, [status]);
  return (
    <div className="h-screen flex justify-between">
      <div className=" w-full md:w-1/3 flex flex-col h-full justify-center px-10 ">
        <div className=" mt-auto">
          <h1 className="text-center text-5xl font-bold mb-2">H-POS</h1>

          <Form layout="vertical" onFinish={onFinish}>
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
              <Input type="email" />
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
              dependencies={["password"]}
              name="passwordAgain"
              rules={[
                { required: true, message: "Password can't be empty!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              {showError ? (
                <p className="text-red-600 text-lg">{error}!!!</p>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  size="large"
                  loading={loading}
                >
                  Register
                </Button>
              )}
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
