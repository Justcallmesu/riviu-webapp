import api from "@/instances/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function useGetAxios(props) {
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

  const result = useQuery({
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
