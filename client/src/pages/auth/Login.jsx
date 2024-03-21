import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/Auth/AuthCarousel";
import { useDispatch, useSelector } from "react-redux";
import { login, resetStatus } from "../../redux/userSlice";
import { Loading } from "../../components/Common/Loading";

const Login = () => {
  const { loginStatus, loginError } = useSelector((state) => state.user);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const onFinish = useCallback(
    (values) => {
      setLoading(true);
      dispatch(login(values));
    },
    [isClicked]
  );


  useEffect(() => {
    if (loginStatus === "succeeded") {
      message.success("Login is successfull");
      dispatch(resetStatus());
      form.resetFields();
      setLoading(false);
      navigate("/");
    } else if (loginStatus === "failed") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setLoading(false);
        dispatch(resetStatus());
      }, 1500);
    }
  }, [loginStatus]);
  return (
    <div className="h-screen flex justify-between">
      <div className=" w-full md:w-1/3 flex flex-col h-full justify-center px-10 ">
        <div className=" mt-auto">
          <h1 className="text-center text-5xl font-bold mb-2">H-POS</h1>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: false }}
          >
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
              {showError ? (
                <div className="flex  items-center gap-x-3">
                  <p className="text-red-400 text-lg">{loginError}!!!</p>
                  <Loading danger />
                </div>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  size="large"
                  loading={loading}
                  onClick={() => setIsClicked(true)}
                >
                  Login
                </Button>
              )}
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
      <div className="hidden md:block w-2/3 bg-[#6c63ff] relative">
        <AuthCarousel />
      </div>
    </div>
  );
};

export default Login;
