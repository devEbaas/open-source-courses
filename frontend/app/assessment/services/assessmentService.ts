import { api } from "@/app/api";
import { IAssessment, IResult } from "../porps.interface";

export const fetchAssessment = async (id: string) => {
  const response = await api.get(`/assessments/${id}`);
  const assessment: IAssessment = response.data;
  return assessment;
};

export const submitAssessmentService = async ({
  assessmentId,
  userId,
  answers,
}: {
  assessmentId: number;
  userId: number;
  answers: { questionId: number; answerId: number }[];
}) => {
  const response = await api.post(`/assessments/${assessmentId}/submit`, {
    userId,
    answers,
  });
  const result: IResult = response.data;
  return result;
};
