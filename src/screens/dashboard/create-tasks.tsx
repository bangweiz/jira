import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "screens/dashboard/util";
import { Card, Input } from "antd";

export const CreateTask = ({ dashboardId }: { dashboardId: number }) => {
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ projectId, name, kanbanId: dashboardId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+ Create Task</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder="Task Summary"
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};
