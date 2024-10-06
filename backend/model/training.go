package model

import "time"

type Training struct {
	ID          int       `json:"id" db:"id"`
	IDUser      int       `json:"idUser" db:"id_usuario"`
	Title       string    `json:"title" db:"titulo"`
	SubTitle    string    `json:"subTitle" db:"sub_titulo"`
	InitialDate time.Time `json:"initialDate" db:"data_inicio"`
	EndDate     time.Time `json:"endDate" db:"data_fim"`
	Objetive    string    `json:"objetive" db:"objetivo"`
}
