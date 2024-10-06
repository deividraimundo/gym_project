package database

import (
	"context"
	"database/sql"
	"errors"
	"gym_project/model"
)

func (d *DAO) GetExercicesByIdTraining(ctx context.Context, idTraining int) (exs []*model.Exercices, err error) {
	q := `
		select id,
		       id_treino,
					 nome,
					 series,
					 repeticoes,
					 descanso
		from exercicios
		where id_treino = $1
	`
	err = d.db.SelectContext(ctx, &exs, q, idTraining)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return
}
