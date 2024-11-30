import api from "@/instances/axios";
import { removeUser } from "@/utils/LocalStorage";
import { useMutation } from "@tanstack/react-query";

export const login = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

export const register = async (registerData) => {
  const response = await api.post("/auth/register", registerData);
  return response.data;
};

export const useLoginQuery = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await login(data);
      return response.data;
    },
  });
};

export const useRegisterQuery = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await register(data);
      return response.data;
    },
  });
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logout = async () => {
  const response = await api.get("/auth/logout");
  removeUser();
  return response.data;
};

export const useGetMe = (queryKey, enabled) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getMe();
      return response.data;
    },
    enabled,
  });
};
