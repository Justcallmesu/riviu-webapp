import api from "@/instances/axios";
import { UseGetAxiosProps } from "@/models/globals/AxiosProps";
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";

function useGetAxios<T>(props: UseGetAxiosProps) {
  const {
    config,
    queryKey,
    enabled = true,
    invalidateQueryKey,
    queryParams,
    removeQueryKey,
  } = props;

  const queryClient = useQueryClient();

  const axiosGet = async () => {
    const response = await api({
      ...config,
      params: queryParams,
    });

    return response.data;
  };

  const result: UseQueryResult<T> = useQuery({
    queryKey,
    queryFn: axiosGet,
    enabled,
  });

  useEffect(() => {
    if (result.status === "success" && invalidateQueryKey) {
      queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
    }

    if (result.status === "success" && removeQueryKey) {
      queryClient.removeQueries({ queryKey: removeQueryKey });
    }

    if (result.status === "error") {
      console.log(result.error);
    }
  }, [result.status]);

  return result;
}

export default useGetAxios;
