export type Exercices = {
  id?: number;
  idTraining?: number;
  name?: string;
  series?: number;
  repetitions?: number;
  rest?: number;
};

export type Training = {
  id?: number;
  idUser?: number;
  title?: string;
  subTitle?: string;
  initialDate?: any;
  endDate?: any;
  objetive?: string;
  exercices?: Exercices[];
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
