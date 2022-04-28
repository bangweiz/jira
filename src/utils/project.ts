import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "./index";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = () =>
    client("projects", { data: cleanObject(param || {}) });

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncRes } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return { mutate, ...asyncRes };
};

export const useAddProject = () => {
  const { run, ...asyncRes } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return { mutate, ...asyncRes };
};
