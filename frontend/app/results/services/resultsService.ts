import { api } from "@/app/api";
import { IAssessmentResult } from "../props.interface";

export const fetchResult = async (resultId: number | string) => {
  try {
    const response = await api.get(`/assessments/result/detail/${resultId}`);
    const result: IAssessmentResult = response.data;
    return result;
  } catch (error) {
    console.error('Error fetching result:', error);
    throw error;
  }
};
