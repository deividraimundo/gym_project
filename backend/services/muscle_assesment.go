package services

import (
	"context"
	"gym_project/model"
)

func (s *Service) UpsertMuscleAssesment(ctx context.Context, data model.MuscleAssesmentInput) (int, error) {
	rowsAffected, err := s.dao.UpdateMuscleAssesment(ctx, data)
	if err != nil {
		return 0, err
	}

	if rowsAffected > 0 {
		return 1, nil
	}

	err = s.dao.InsertMuscleAssesment(ctx, data)
	if err != nil {
		return 0, err
	}

	return 1, nil
}

func (s *Service) DeleteMuscleAssesment(ctx context.Context, id int) (int, error) {
	if err := s.dao.DeleteMuscleAssesment(ctx, id); err != nil {
		return 0, err
	}
	return 1, nil
}
