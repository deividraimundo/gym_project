package graph

//go:generate go run github.com/99designs/gqlgen generate

import (
	"gym_project/database"
	"gym_project/services"
)

type Resolver struct {
	svc *services.Service
	dao *database.DAO
}

func NewResolver(svc *services.Service) *Resolver {
	return &Resolver{
		svc: svc,
	}
}
