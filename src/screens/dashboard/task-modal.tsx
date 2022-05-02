import React, { useEffect } from "react";
import { useTasksModal, useTasksQueryKey } from "screens/dashboard/util";
import { useDeleteTask, useEditTask } from "utils/task";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";
// import { EpicSelect } from "components/epic-select";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = Form.useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const startDelete = () => {
    close();
    Modal.confirm({
      okText: "Yes",
      cancelText: "Cancel",
      title: "Sure?",
      onOk() {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText="Confirm"
      cancelText="Cancel"
      confirmLoading={editLoading}
      title="Edit"
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label="Title"
          name="name"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>
        {/*<Form.Item label="Epic" name={"epicId"}>*/}
        {/*  <EpicSelect defaultOptionName="Epic" />*/}
        {/*</Form.Item>*/}
        <Form.Item label="Owner" name="processorId">
          <UserSelect defaultOptionName="Owner" />
        </Form.Item>
        <Form.Item label="Type" name="typeId">
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button onClick={startDelete} style={{ fontSize: "14px" }} size="small">
          Delete
        </Button>
      </div>
    </Modal>
  );
};
