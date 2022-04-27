import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("Passwords are different"));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Input placeholder="username" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Input placeholder="password" type="password" id="password" />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Input placeholder="confirm password" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          Register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
