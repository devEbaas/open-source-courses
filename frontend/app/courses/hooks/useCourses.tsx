import { useEffect, useState } from "react";
import { ICourse } from "../props.interface";
import { fetchCourses } from "../services/coursesService";

export const useCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    courses,
    isLoading,
    error,
  };
};
