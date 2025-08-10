export interface IAssessment {
  assessment: Assessment;
  questions:  Question[];
}

export interface Assessment {
  id:          number;
  name:        string;
  description: string;
  course?:     Assessment;
}

export interface Question {
  id:           number;
  text:         string;
  categoryId:   number;
  assessmentId: number;
  answers:      Answer[];
  category:     Category;
}

export interface Answer {
  id:        number;
  text:      string;
  isCorrect: boolean;
}

export interface Category {
  id:   number;
  name: Name;
}

export enum Name {
  ProgramaciónBackend = "Programación Backend",
  ProgramaciónFrontend = "Programación Frontend",
}
