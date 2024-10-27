package database

import (
	"context"
	"database/sql"
	"errors"
	"gym_project/model"
	"gym_project/utils"
	"strings"

	"github.com/jmoiron/sqlx"
)

func UpsertExercices(ctx context.Context, tx *sqlx.Tx, data *model.ExercicesInput) error {
	rowsAffected, err := UpdateExercices(ctx, tx, data)
	if err != nil {
		return err
	}

	if rowsAffected > 0 {
		return nil
	}

	err = InsertExercices(ctx, tx, data)
	if err != nil {
		return err
	}

	return nil
}

func InsertExercices(ctx context.Context, tx *sqlx.Tx, data *model.ExercicesInput) (err error) {
	id, err := GetNextSequence("exercicios_id_seq", tx)
	if err != nil {
		return err
	}
	data.ID = id
	q := `
		insert into exercicios (
			id_treino,
			nome,
			series,
			repeticoes,
			descanso
		) values (
			$1,
			$2,
			$3,
			$4,
			$5
		)
	`
	_, err = tx.ExecContext(ctx, q, data.IDTraining, data.Name, data.Series, data.Repetitions, data.Rest)
	return
}

func UpdateExercices(ctx context.Context, tx *sqlx.Tx, data *model.ExercicesInput) (rowsAffected int64, err error) {
	q := `
		update exercicios set
		  id_treino = $1,
			nome = $2,
			series = $3,
			repeticoes = $4,
			descanso = $5
		where id = $6
	`
	row, err := tx.ExecContext(ctx, q, data.IDTraining, data.Name, data.Series, data.Repetitions, data.Rest, data.ID)
	if err != nil {
		return
	}

	return row.RowsAffected()
}

func DeleteExercicesByIdTraining(ctx context.Context, tx *sqlx.Tx, idTraining int) (err error) {
	q := `
		delete
		from exercicios
		where id_treino = $1
	`
	q = tx.Rebind(q)
	_, err = tx.ExecContext(ctx, q, idTraining)
	return
}

func DeleteExercicesByIds(ctx context.Context, tx *sqlx.Tx, ids []int) (err error) {
	q := `
		delete
		from exercicios
		where id in (?` + strings.Repeat(", ?", len(ids)-1) + `)
	`
	_, err = tx.ExecContext(ctx, q, utils.ToAnyArray(ids)...)
	return
}

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
