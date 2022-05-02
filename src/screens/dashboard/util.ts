import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/project\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useDashboardSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useDashboardQueryKey = () => [
  "kanabns",
  useDashboardSearchParams(),
];

export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
