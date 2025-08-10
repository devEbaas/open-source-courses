import { api } from "@/app/api";
import { ICourse } from "../props.interface";

export const fetchCourses = async () => {
  try {
    const response = await api.get('/courses');
    const data: ICourse[] = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};
