export interface ICourse {
  id:          number;
  name:        string;
  description: string;
  assessment:  Assessment;
}

export interface Assessment {
  id: number;
}
