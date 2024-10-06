package model

type Exercices struct {
	ID          int    `json:"id" db:"id"`
	IDTraining  int    `json:"idTraining" db:"id_treino"`
	Name        string `json:"name" db:"nome"`
	Series      int    `json:"series" db:"series"`
	Repetitions int    `json:"repetitions" db:"repeticoes"`
	Rest        int    `json:"rest" db:"descanso"`
}
