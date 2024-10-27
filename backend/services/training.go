package services

import (
	"context"
	"gym_project/database"
	"gym_project/model"

	"github.com/jmoiron/sqlx"
)

func (s *Service) UpsertTraining(ctx context.Context, data model.TrainingInputCustom) (int, error) {
	err := s.dao.Transactionally(func(tx *sqlx.Tx) error {
		if data.Self != nil {
			if err := database.UpsertTraining(ctx, tx, data.Self); err != nil {
				return err
			}
		}

		for _, ex := range data.Exercices {
			if ex != nil {
				ex.IDTraining = data.Self.ID
				if err := database.UpsertExercices(ctx, tx, ex); err != nil {
					return err
				}
			}
		}

		if len(data.IdsDelExercices) > 0 {
			if err := database.DeleteExercicesByIds(ctx, tx, data.IdsDelExercices); err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		return 0, err
	}

	return 1, nil
}

func (s *Service) DeleteTraining(ctx context.Context, id int) (int, error) {
	err := s.dao.Transactionally(func(tx *sqlx.Tx) error {
		if err := database.DeleteExercicesByIdTraining(ctx, tx, id); err != nil {
			return err
		}

		if err := database.DeleteTraining(ctx, tx, id); err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return 0, err
	}

	return 1, nil
}

func (s *Service) GetTrainingByID(ctx context.Context, id int) (*model.TrainingCustom, error) {
	training, err := s.dao.GetTrainingById(ctx, id)
	if err != nil {
		return nil, err
	}

	exercices, err := s.dao.GetExercicesByIdTraining(ctx, id)
	if err != nil {
		return nil, err
	}

	return &model.TrainingCustom{
		Self:      training,
		Exercices: exercices,
	}, nil
}

func (s *Service) GetTrainingsByUser(ctx context.Context, idUser int) ([]*model.TrainingCustom, error) {
	trainings := []*model.TrainingCustom{}

	trainingsSelf, err := s.dao.SelectTrainingsByUser(ctx, idUser)
	if err != nil {
		return nil, err
	}

	for _, tr := range trainingsSelf {
		exercices, err := s.dao.GetExercicesByIdTraining(ctx, tr.ID)
		if err != nil {
			return nil, err
		}

		trainings = append(trainings, &model.TrainingCustom{
			Self:      tr,
			Exercices: exercices,
		})
	}

	return trainings, nil
}
