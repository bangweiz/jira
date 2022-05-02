import React from "react";
import { useDocumentTitle } from "../../utils";
import { useDashboards } from "../../utils/dashboard";
import {
  useDashboardSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { DashboardColumn } from "./dashboard-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { ScreenContainer } from "../../components/lib";

export const DashboardScreen = () => {
  useDocumentTitle("Dashboard");
  const { data: dashboards, isLoading: dashboardIsLoading } = useDashboards(
    useDashboardSearchParams()
  );
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || dashboardIsLoading;

  return (
    <ScreenContainer>
      <h1>{currentProject?.name} Dashboard</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <ColumnContainer>
          {dashboards?.map((dashboard) => (
            <DashboardColumn dashboard={dashboard} key={dashboard.id} />
          ))}
        </ColumnContainer>
      )}
    </ScreenContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: auto;
  flex: 1;
`;
