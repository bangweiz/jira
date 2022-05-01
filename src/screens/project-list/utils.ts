import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const searchParams = useMemo(
    () => ({ ...param, personId: Number(param.personId) || undefined }),
    [param]
  );
  return [searchParams, setParam] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, serProjectModalOpen] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => serProjectModalOpen({ projectCreate: true });
  const close = () => serProjectModalOpen({ projectCreate: undefined });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
