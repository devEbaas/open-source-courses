import { api } from "@/app/api";
import { IAssessment } from "../porps.interface";

export const fetchAssessment = async (id: string) => {
  const response = await api.get(`/assessments/${id}`);
  const assessment: IAssessment = response.data;
  return assessment;
};
