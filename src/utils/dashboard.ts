import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Dashboard } from "../types/dashboard";

export const useDashboards = (param?: Partial<Dashboard>) => {
  const client = useHttp();

  return useQuery<Dashboard[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
