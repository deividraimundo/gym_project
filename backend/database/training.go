package database

import (
	"context"
	"database/sql"
	"errors"
	"gym_project/model"

	"github.com/jmoiron/sqlx"
)

func UpsertTraining(ctx context.Context, tx *sqlx.Tx, data *model.TrainingInput) error {
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

func InsertTraining(ctx context.Context, tx *sqlx.Tx, data *model.TrainingInput) (err error) {
	id, err := GetNextSequence("treinos_id_seq", tx)
	if err != nil {
		return err
	}
	data.ID = id
	q := `
		insert into treinos (
		  id,
			titulo,
			sub_titulo,
			data_inicio,
			data_fim,
			objetivo,
			id_usuario
		) values (
			$1,
			$2,
			$3,
			$4,
			$5,
			$6,
			$7
		)
	`
	_, err = tx.ExecContext(ctx, q, data.ID, data.Title, data.SubTitle, data.InitialDate, data.EndDate, data.Objetive, data.IDUser)
	return
}

func UpdateTraining(ctx context.Context, tx *sqlx.Tx, data *model.TrainingInput) (rowsAffected int64, err error) {
	q := `
		update treinos set
		  titulo = $1,
			sub_titulo = $2,
			data_inicio = $3,
			data_fim = $4,
			objetivo = $5
		where id = $6
	`
	q = tx.Rebind(q)
	row, err := tx.ExecContext(ctx, q, data.Title, data.SubTitle, data.InitialDate, data.EndDate, data.Objetive, data.ID)
	if err != nil {
		return
	}

	return row.RowsAffected()
}

func DeleteTraining(ctx context.Context, tx *sqlx.Tx, id int) (err error) {
	q := `
		delete
		from treinos
		where id = $1
	`
	q = tx.Rebind(q)
	_, err = tx.ExecContext(ctx, q, id)
	return
}

func (d *DAO) GetTrainingById(ctx context.Context, id int) (tr *model.Training, err error) {
	training := model.Training{}
	q := `
		select id,
		       id_usuario,
					 titulo,
					 sub_titulo,
					 data_inicio,
					 data_fim,
					 objetivo
		from treinos
		where id = $1
	`
	err = d.db.GetContext(ctx, &training, q, id)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return &training, err
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
		from treinos
		where id_usuario = $1
		order by id
	`
	err = d.db.SelectContext(ctx, &trs, q, idUser)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return
}
