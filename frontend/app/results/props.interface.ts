export interface IAssessmentResult {
  result: Result;
  detail: Detail[];
  categories: Category[];
}

export interface Detail {
  id:                 number;
  assessmentResultId: number;
  questionId:         number;
  questionText:       string;
  selectedAnswerId:   number;
  correctAnswerId:    number;
  isCorrect:          boolean;
}

export interface Result {
  id:             number;
  userId:         number;
  assessmentId:   number;
  score:          number;
  totalQuestions: number;
  createdAt:      string;
  assessment:     Assessment;
  user:           User;
}

export interface Assessment {
  id:   number;
  name: string;
}

export interface User {
  id:    number;
  name:  string;
  email: string;
}


export interface Category {
  categoryId:   number;
  categoryName: string;
  correct:      number;
  incorrect:    number;
  total:        number;
}
