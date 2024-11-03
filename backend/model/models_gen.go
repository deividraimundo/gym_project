// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"time"
)

type ExercicesInput struct {
	ID          int    `json:"id"`
	IDTraining  int    `json:"idTraining"`
	Name        string `json:"name"`
	Series      int    `json:"series"`
	Repetitions int    `json:"repetitions"`
	Rest        int    `json:"rest"`
}

type MuscleAssesmentInput struct {
	ID              int       `json:"id"`
	IDUser          int       `json:"idUser"`
	AvaliationDate  time.Time `json:"avaliationDate"`
	PersonalTrainer *string   `json:"personalTrainer,omitempty"`
	BicepsLeft      float64   `json:"bicepsLeft"`
	BicepsRight     float64   `json:"bicepsRight"`
	CalfLeft        float64   `json:"calfLeft"`
	CalfRight       float64   `json:"calfRight"`
	ThighLeft       float64   `json:"thighLeft"`
	ThighRight      float64   `json:"thighRight"`
	ForearmLeft     float64   `json:"forearmLeft"`
	ForearmRight    float64   `json:"forearmRight"`
	Chest           float64   `json:"chest"`
}

type Mutation struct {
}

type Query struct {
}

type SignInInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type SignUpInput struct {
	Name     string `json:"name"`
	LastName string `json:"lastName"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type TrainingCustom struct {
	Self      *Training    `json:"self"`
	Exercices []*Exercices `json:"exercices"`
}

type TrainingInput struct {
	ID          int       `json:"id"`
	IDUser      int       `json:"idUser"`
	Title       string    `json:"title"`
	SubTitle    string    `json:"subTitle"`
	InitialDate time.Time `json:"initialDate"`
	EndDate     time.Time `json:"endDate"`
	Objetive    string    `json:"objetive"`
}

type TrainingInputCustom struct {
	Self            *TrainingInput    `json:"self"`
	Exercices       []*ExercicesInput `json:"exercices"`
	IdsDelExercices []int             `json:"idsDelExercices"`
}
