package model

import "time"

type MuscleAssesment struct {
	ID              int64     `json:"id" db:"id"`
	IDUser          int64     `json:"idUser" db:"id_usuario"`
	AvaliationDate  time.Time `json:"avaliationDate" db:"data_avaliacao"`
	PersonalTrainer *string   `json:"personalTrainer" db:"avaliador_fisico"`
	BicepsLeft      float64   `json:"bicepsLeft" db:"biceps_esquerda"`
	BicepsRight     float64   `json:"bicepsRight" db:"biceps_direita"`
	CalfLeft        float64   `json:"calfLeft" db:"panturrilha_esquerda"`
	CalfRight       float64   `json:"calfRight" db:"panturrilha_direita"`
	ThighLeft       float64   `json:"thighLeft" db:"coxa_esquerda"`
	ThighRight      float64   `json:"thighRight" db:"coxa_direita"`
	Chest           float64   `json:"chest" db:"torax"`
	ForearmLeft     float64   `json:"forearmLeft" db:"antebraco_esquerda"`
	ForearmRight    float64   `json:"forearmRight" db:"antebraco_direita"`
}
