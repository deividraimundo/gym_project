import { gql } from "@apollo/client";

export const LOGOFF = gql`
  mutation logoff {
    logoff
  }
`;

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
  mutation upsertMuscleAssesment($data: MuscleAssesmentInput!) {
    upsertMuscleAssesment(data: $data)
  }
`;

export const MUTATION_DELETE_MUSCLE_ASSESMENT = gql`
  mutation deleteMuscleAssesment($id: Int!) {
    deleteMuscleAssesment(id: $id)
  }
`;

export const MUTATION_UPSERT_MEDICAL_RESTRICTIONS = gql`
  mutation upsertMedicalRestrictions($data: MedicalRestrictionsInput!) {
    upsertMedicalRestrictions(data: $data)
  }
`;

export const MUTATION_DELETE_MEDICAL_RESTRICTIONS = gql`
  mutation deleteMedicalRestrictions($id: Int!) {
    deleteMedicalRestrictions(id: $id)
  }
`;
