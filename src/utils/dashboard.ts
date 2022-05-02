import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Dashboard } from "../types/dashboard";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useDashboards = (param?: Partial<Dashboard>) => {
  const client = useHttp();

  return useQuery<Dashboard[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

export const useAddDashboard = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Dashboard>) =>
      client(`kanbans`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteDashboard = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
