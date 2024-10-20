package database

import (
	"context"
	"database/sql"
	"errors"
	"gym_project/model"

	"github.com/jmoiron/sqlx"
)

func UpsertTraining(ctx context.Context, tx *sqlx.Tx, data model.TrainingInput) error {
	rowsAffected, err := UpdateTraining(ctx, tx, data)
	if err != nil {
		return err
	}

	if rowsAffected > 0 {
		return nil
	}

	err = InsertTraining(ctx, tx, data)
	if err != nil {
		return err
	}

	return nil
}

func InsertTraining(ctx context.Context, tx *sqlx.Tx, data model.TrainingInput) (err error) {
	q := `
		insert into treino (
			title,
			subTitle,
			initialDate,
			endDate,
			objetive
		) values (
			:title,
			:subTitle,
			:initialDate,
			:endDate,
			:objetive 
		)
	`
	_, err = tx.NamedExecContext(ctx, q, data)
	return
}

func UpdateTraining(ctx context.Context, tx *sqlx.Tx, data model.TrainingInput) (rowsAffected int64, err error) {
	q := `
		update treino set
		  title = :title,
			subTitle = :subTitle,
			initialDate = :initialDate,
			endDate = :endDate,
			objetive = :objetive
		where id = :id
	`
	row, err := tx.NamedExecContext(ctx, q, data)
	if err != nil {
		return
	}

	return row.RowsAffected()
}

func DeleteTraining(ctx context.Context, tx *sqlx.Tx, id int) (err error) {
	q := `
		delete
		from treino
		where id = $1
	`
	_, err = tx.ExecContext(ctx, q, id)
	return
}

func (d *DAO) GetTrainingById(ctx context.Context, id int) (tr *model.Training, err error) {
	q := `
		select id,
		       id_usuario,
					 titulo,
					 sub_titulo,
					 data_inicio,
					 data_fim,
					 objetivo
		from treino
		where id = $1
	`
	err = d.db.GetContext(ctx, &tr, q, id)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return
}

func (d *DAO) SelectTrainingsByUser(ctx context.Context, idUser int) (trs []*model.Training, err error) {
	q := `
		select id,
		       id_usuario,
					 titulo,
					 sub_titulo,
					 data_inicio,
					 data_fim,
					 objetivo
		from treino
		where id_usuario = $1
		order by id
	`
	err = d.db.SelectContext(ctx, &trs, q, idUser)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return
}
