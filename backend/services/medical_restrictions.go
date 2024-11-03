package services

import (
	"context"
	"gym_project/model"
)

func (s *Service) UpsertMedicalRestrictions(ctx context.Context, data model.MedicalRestrictionsInput) (int, error) {
	rowsAffected, err := s.dao.UpdateMedicalRestrictions(ctx, data)
	if err != nil {
		return 0, err
	}

	if rowsAffected > 0 {
		return 1, nil
	}

	err = s.dao.InsertMedicalRestrictions(ctx, data)
	if err != nil {
		return 0, err
	}

	return 1, nil
}

func (s *Service) DeleteMedicalRestrictions(ctx context.Context, id int) (int, error) {
	if err := s.dao.DeleteMedicalRestrictions(ctx, id); err != nil {
		return 0, err
	}
	return 1, nil
}
