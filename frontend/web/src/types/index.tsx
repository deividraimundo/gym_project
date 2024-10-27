export type Exercices = {
  id: number;
  idTraining: number;
  name: string;
  series: number;
  repetitions: number;
  rest: number;
};

export type TrainingInput = {
  id: number;
  idUser: number;
  title: string;
  subTitle: string;
  initialDate: any;
  endDate: any;
  objetive: string;
};

export type TrainingInputCustom = {
  self: TrainingInput;
  exercices: Exercices[];
  idsDelExercices: number[];
};

export type MuscleAssesment = {
  id?: number;
  idUser?: number;
  avaliationDate?: any;
  personalTrainer?: string;
  bicepsLeft?: number;
  bicepsRight?: number;
  calfLeft?: number;
  calfRight?: number;
  thighLeft?: number;
  thighRight?: number;
  chest?: number;
  forearmLeft?: number;
  forearmRight?: number;
};
