import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import loginBackground from "../../assets/loginBg.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const arrayLogin = {
    login: "admin",
    password: "admin",
  };
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const matchedLogin = loginValue === arrayLogin.login;
  const matchedPassword = passwordValue === arrayLogin.password;

  const submitLogin = () => {
    if (matchedLogin && matchedPassword) {
      localStorage.setItem("auth", JSON.stringify("true"));
      setLoginValue("");
      setPasswordValue("");
      navigate("/dashboard");
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleLoginChange = (e) => {
    setLoginValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <div className="flex">
      <div className="mt-0">
        <img
          className="w-screen h-screen blur-md fixed -z-[999]"
          src={loginBackground}
          alt="login main hr pictures"
        />
      </div>

      <div className="bg-glassBg/60 backdrop-blur-3xl z-[999] border border-white rounded-xl max-w-[310px] md:max-w-[350px] lg:max-w-[450px] w-full  px-5 pt-6 container  mt-10 md:mt-32">
        <h1 className="text-3xl font-bold mb-5 ">Login</h1>
        <Form
          name="basic"
          labelCol={{
            span: 6.5,
          }}
          wrapperCol={{
            span: 90,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="w-full mb-10"
            label="Login"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your login!",
              },
            ]}
          >
            <Input value={loginValue} onChange={handleLoginChange} />
          </Form.Item>

          <Form.Item
            className="w-full"
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              value={passwordValue}
              onChange={handlePasswordChange}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 90,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={
              {
                // offset: 8,
                // span: 16,
              }
            }
          >
            <Button
              onClick={() => submitLogin()}
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
