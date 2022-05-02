import React from "react";
import { Dashboard } from "../../types/dashboard";
import { useTasks } from "../../utils/task";
import {
  useDashboardQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from "./util";
import { useTaskTypes } from "../../utils/task-type";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-tasks";
import { Task } from "../../types/task";
import { Mark } from "../../components/mark";
import { useDeleteDashboard } from "../../utils/dashboard";
import { Row } from "../../components/lib";

export const DashboardColumn = ({ dashboard }: { dashboard: Dashboard }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === dashboard.id);
  return (
    <Container>
      <Row between={true}>
        <h3>{dashboard.name}</h3>
        <More dashboard={dashboard} />
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <CreateTask dashboardId={dashboard.id} />
      </TasksContainer>
    </Container>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
    >
      <p>
        <Mark name={task.name} keyword={keyword} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const More = ({ dashboard }: { dashboard: Dashboard }) => {
  const { mutateAsync } = useDeleteDashboard(useDashboardQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: "Yes",
      cancelText: "Cancel",
      title: "Sure?",
      onOk() {
        return mutateAsync({ id: dashboard.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type="link" onClick={startDelete}>
          Delete
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type="link">...</Button>
    </Dropdown>
  );
};

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }

  return <img src={name === "task" ? taskIcon : bugIcon} alt={name} />;
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
