import React from "react";
import { useDocumentTitle } from "../../utils";
import { useDashboards } from "../../utils/dashboard";
import { useDashboardSearchParams, useProjectInUrl } from "./util";
import { DashboardColumn } from "./dashboard-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";

export const DashboardScreen = () => {
  useDocumentTitle("Dashboard");
  const { data: dashboards } = useDashboards(useDashboardSearchParams());
  const { data: currentProject } = useProjectInUrl();

  return (
    <div>
      <h1>{currentProject?.name} Dashboard</h1>
      <SearchPanel />
      <ColumnContainer>
        {dashboards?.map((dashboard) => (
          <DashboardColumn dashboard={dashboard} key={dashboard.id} />
        ))}
      </ColumnContainer>
    </div>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
