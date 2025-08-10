import { api } from "@/app/api";

export const fetchAssessment = async (id: string) => {
  const response = await api.get(`/assessments/${id}`);
  return response.data;
};
