import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./utils";
import { UserSelect } from "../../components/user-select";
import { useAddProject, useEditProject } from "../../utils/project";
import { ErrorBox } from "../../components/lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const title = editingProject ? "Edit Project" : "Create Project";
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer onClose={closeModal} visible={projectModalOpen} width="100%">
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout="vertical"
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Title"
                name="name"
                rules={[{ required: true, message: "This filed is required" }]}
              >
                <Input placeholder="title" />
              </Form.Item>
              <Form.Item
                label="Organization"
                name="organization"
                rules={[{ required: true, message: "This filed is required" }]}
              >
                <Input placeholder="organization" />
              </Form.Item>
              <Form.Item
                label="Owner"
                name="personId"
                rules={[{ required: true, message: "This filed is required" }]}
              >
                <UserSelect defaultOptionName="Owner" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
