package database

import (
	"context"
	"database/sql"
	"errors"
	"gym_project/model"
)

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

func (d *DAO) GetTrainingsByUser(ctx context.Context, idUser int) (trs []*model.Training, err error) {
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
