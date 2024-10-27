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
