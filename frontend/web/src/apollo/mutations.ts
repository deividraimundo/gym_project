import { gql } from "@apollo/client";

export const MUTATION_UPSERT_TRAINING = gql`
  mutation upsertTraining($data: TrainingInputCustom!) {
    upsertTraining(data: $data)
  }
`;

export const MUTATION_DELETE_TRAINING = gql`
  mutation deleteTraining($id: Int!) {
    deleteTraining(id: $id)
  }
`;

export const MUTATION_UPSERT_MUSCLE_ASSESMENT = gql`
  mutation upsertMuscleAssesment($data: MuscleAssesmentCustom!) {
    upsertMuscleAssesment(data: $data)
  }
`;

export const MUTATION_DELETE_MUSCLE_ASSESMENT = gql`
  mutation deleteMuscleAssesment($id: Int!) {
    deleteMuscleAssesment(id: $id)
  }
`;
