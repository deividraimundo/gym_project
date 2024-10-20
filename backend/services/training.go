package services

import (
	"context"
	"gym_project/database"
	"gym_project/model"

	"github.com/jmoiron/sqlx"
)

func (s *Service) UpsertTraining(ctx context.Context, data model.TrainingCustom) (int, error) {
	err := s.dao.Transactionally(func(tx *sqlx.Tx) error {
		if data.Self != nil {
			if err := database.UpsertTraining(ctx, tx, *data.Self); err != nil {
				return err
			}
		}

		for _, ex := range data.Exercices {
			if ex != nil {
				if err := database.UpsertExercices(ctx, tx, *ex); err != nil {
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
