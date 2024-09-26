package graph

import "gym_project/services"

type Resolver struct {
	svc *services.Service
}

func NewResolver(svc *services.Service) *Resolver {
	return &Resolver{
		svc: svc,
	}
}
