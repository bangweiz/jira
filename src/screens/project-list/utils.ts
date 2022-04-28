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
