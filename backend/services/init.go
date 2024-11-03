package services

import (
	"errors"
	"log"
)

func (s *Service) InitDatabase() error {
	if s.dao == nil {
		return errors.New("database is not initialized")
	}

	log.Println("Sincronizando tabela usuarios...")
	err := s.dao.CreateTableUsers()
	if err != nil {
		return errors.New("error creating table usuarios: " + err.Error())
	}

	log.Println("Sincronizando tabela avaliacao_fisica...")
	err = s.dao.CreateTableMuscleAssesment()
	if err != nil {
		return errors.New("error creating table avaliacao_fisica: " + err.Error())
	}

	log.Println("Sincronizando tabela treino...")
	err = s.dao.CreateTableTraining()
	if err != nil {
		return errors.New("error creating table treino: " + err.Error())
	}

	log.Println("Sincronizando tabela exercicios...")
	err = s.dao.CreateTableExercices()
	if err != nil {
		return errors.New("error creating table exercicios: " + err.Error())
	}

	log.Println("Sincronizando tabela restricoes_medicas...")
	err = s.dao.CreateTableMedicalRestrictions()
	if err != nil {
		return errors.New("error creating table restricoes_medicas: " + err.Error())
	}

	return nil
}
