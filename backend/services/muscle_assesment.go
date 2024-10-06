package services

import (
	"context"
	"gym_project/model"
)

func (s *Service) InsertMuscleAssesment(ctx context.Context, data model.MuscleAssesmentInput) (int, error) {
	if err := s.dao.InsertMuscleAssesment(ctx, data); err != nil {
		return 0, err
	}
	return 1, nil
}

func (s *Service) UpdateMuscleAssesment(ctx context.Context, data model.MuscleAssesmentInput) (int, error) {
	if err := s.dao.UpdateMuscleAssesment(ctx, data); err != nil {
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
