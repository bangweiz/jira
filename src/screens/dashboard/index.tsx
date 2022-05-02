import React, { useCallback } from "react";
import { useDocumentTitle } from "../../utils";
import { useDashboards, useReorderDashboard } from "../../utils/dashboard";
import {
  useDashboardQueryKey,
  useDashboardSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";
import { DashboardColumn } from "./dashboard-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { useReorderTask, useTasks } from "../../utils/task";
import { Spin } from "antd";
import { ScreenContainer } from "../../components/lib";
import { CreateDashboard } from "./create-dashboard";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";

export const DashboardScreen = () => {
  useDocumentTitle("Dashboard");
  const { data: dashboards, isLoading: dashboardIsLoading } = useDashboards(
    useDashboardSearchParams()
  );
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || dashboardIsLoading;
  const onDragEnd = useDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name} Dashboard</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <ColumnContainer>
            <Drop type="COLUMN" direction="horizontal" droppableId="dashboard">
              <DropChild style={{ display: "flex" }}>
                {dashboards?.map((dashboard, index) => (
                  <Drag
                    draggableId={"dashboard" + dashboard.id}
                    index={index}
                    key={dashboard.id}
                  >
                    <DashboardColumn dashboard={dashboard} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateDashboard />
          </ColumnContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useDashboards(useDashboardSearchParams());
  const { mutate: reorderKanban } = useReorderDashboard(useDashboardQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: auto;
  flex: 1;
`;
