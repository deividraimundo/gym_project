package services

import (
	"context"
	"gym_project/database"
	"gym_project/model"

	"github.com/jmoiron/sqlx"
)

func (s *Service) InsertUser(ctx context.Context, data *model.SignUpInput) error {
	err := s.dao.Transactionally(func(tx *sqlx.Tx) error {
		err := database.InsertUser(ctx, tx, data)
		if err != nil {
			return err
		}
		return nil
	})

	if err != nil {
		return err
	}

	return nil
}
