import { apiClient } from "./axios";

export const sendMessage = async (message: string) => {
  const response = await apiClient.post("/chat", { prompt: message });
  return response.data;
};