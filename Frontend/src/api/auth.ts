import { apiClient } from "./axios";

export const login = async (data: any) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const register = async (data: any) => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};