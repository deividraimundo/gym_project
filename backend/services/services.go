package services

import "gym_project/database"

type Service struct {
	dao *database.DAO
}

func New(dao *database.DAO) *Service {
	return &Service{
		dao: dao,
	}
}
