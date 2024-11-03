import { gql } from "@apollo/client";

export const QUERY_TRAINING_BY_ID = gql`
  query trainingById($id: Int!) {
    getTrainingById(id: $id) {
      self {
        id
        idUser
        title
        subTitle
        initialDate
        endDate
        objetive
      }
      exercices {
        id
        idTraining
        name
        series
        repetitions
        rest
      }
    }
  }
`;

export const QUERY_TRAINING_BY_ID_USER = gql`
  query trainingByIdUser {
    getTrainingsByUser {
      self {
        id
        idUser
        title
        subTitle
        initialDate
        endDate
        objetive
      }
      exercices {
        id
        idTraining
        name
        series
        repetitions
        rest
      }
    }
  }
`;

export const QUERY_MUSCLE_ASSESMENT_HISTORY_BY_USER = gql`
  query getHistoryMuscleAssesmentByUser {
    getHistoryMuscleAssesmentByUser {
      id
      idUser
      avaliationDate
      personalTrainer
      bicepsLeft
      bicepsRight
      calfLeft
      calfRight
      thighLeft
      thighRight
      chest
      forearmLeft
      forearmRight
    }
  }
`;

export const QUERY_MUSCLE_ASSESMENT_BY_ID = gql`
  query getMuscleAssesmentById($id: Int!) {
    getMuscleAssesmentById(id: $id) {
      id
      idUser
      avaliationDate
      personalTrainer
      bicepsLeft
      bicepsRight
      calfLeft
      calfRight
      thighLeft
      thighRight
      chest
      forearmLeft
      forearmRight
    }
  }
`;
