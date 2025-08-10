import { useEffect, useState } from "react";
import { Answer, Assessment, Question } from "../porps.interface";
import { fetchAssessment } from "../services/assessmentService";

export const useAssessment = (assessmentId: string) => {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, Answer>>({});

  const handleAnswerChange = (questionId: number, answer: Answer) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // const verifyAnswers = () => {
  //   // Logic to verify user answers

  // };

  useEffect(() => {
    const fetchData = async () => {
      if (!assessmentId) return;
      const data = await fetchAssessment(assessmentId);
      setAssessment(data.assessment);
      setQuestions(data.questions);
    };
    fetchData();
  }, [assessmentId]);

  useEffect(() => {
    console.log('User answers changed:', userAnswers);
  }, [userAnswers]);

  return { assessment, questions, handleAnswerChange };
};
