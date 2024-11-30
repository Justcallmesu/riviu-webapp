import api from "@/instances/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAxiosPostPatch(props) {
  const {
    config,
    invalidateQueryKey,
    invalidateType,
    onSuccess,
    queryParams,
    removeQueryKey,
    removeType,
    redirect,
  } = props;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const axiosPostPatch = async ({ data, id, id2 }) => {
    let finalConfig = config();

    if (id) finalConfig = config(id);
    if (id2) finalConfig = config(id, id2);

    const response = await api({
      ...finalConfig,
      data,
      params: queryParams,
    });

    return response.data;
  };

  const successFunction = async (data) => {
    if (removeQueryKey)
      queryClient.removeQueries({ queryKey: removeQueryKey, type: removeType });

    if (invalidateQueryKey)
      queryClient.invalidateQueries({
        queryKey: invalidateQueryKey,
        type: invalidateType,
      });

    onSuccess?.();

    if (redirect) navigate(redirect);
  };

  const mutation = useMutation({
    mutationFn: ({ data, id, id2 }) => {
      return axiosPostPatch({ data, id, id2 });
    },
    onSuccess: (data) => successFunction(data),
    onError: (error) => {
      console.error(error);
    },
  });

  return { ...mutation };
}
