import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => {
    return keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) };
    }, {} as { [key in K]: string });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const setParam = (params: Partial<{ [key in K]: unknown }>) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
  return [params, setParam] as const;
};
