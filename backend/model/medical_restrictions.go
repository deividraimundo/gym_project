package model

type MedicalRestrictions struct {
	ID           int    `json:"id" db:"id"`
	IDUser       int    `json:"idUser" db:"id_usuario"`
	Smoker       bool   `json:"smoker" db:"fumante"`
	HeartDisease bool   `json:"heartDisease" db:"doenca_cardiaca"`
	Surgery      bool   `json:"surgery" db:"cirurgia"`
	Obs          string `json:"obs" db:"obs"`
}
