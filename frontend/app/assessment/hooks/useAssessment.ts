import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Answer, Assessment, Question } from "../props.interface";
import { fetchAssessment, submitAssessmentService } from "../services/assessmentService";
import { useAuth } from "@/app/context/AuthContext";

export const useAssessment = (assessmentId: string) => {
  const router = useRouter();
  const { user } = useAuth();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const handleAnswerChange = (questionId: number, answer: Answer) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer.id }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!assessmentId) return;
      const data = await fetchAssessment(assessmentId);
      setAssessment(data.assessment);
      setQuestions(data.questions);
    };
    fetchData();
  }, [assessmentId]);

  const saveAnswers = async () => {
    try {
      const result = await submitAssessmentService({
        assessmentId: assessment?.id as number,
        userId: user?.id as number,
        answers: Object.entries(userAnswers).map(([questionId, answerId]) => ({
          questionId: Number(questionId),
          answerId,
        })),
      });
      console.log('Assessment submitted successfully:', result);
      if (result.resultId) {
        router.push(`/results/${result.resultId}`);
      }
    } catch (error) {
      console.error('Error saving answers:', error);
    }
  };

  useEffect(() => {
    console.log('User answers changed:', userAnswers);
  }, [userAnswers]);

  return {
    assessment,
    questions,
    userAnswers,
    handleAnswerChange,
    saveAnswers,
  };
};
