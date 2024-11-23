package database

import (
	"context"
	"database/sql"
	"errors"
	"gym_project/model"
)

func (d *DAO) InsertMuscleAssesment(ctx context.Context, data model.MuscleAssesmentInput) (err error) {
	q := `
		insert into avaliacao_fisica (
			id_usuario,
			data_avaliacao,
			avaliador_fisico,
			biceps_esquerda,
			biceps_direita,
			panturrilha_esquerda,
			panturrilha_direita,
			coxa_esquerda,
			coxa_direita,
			torax,
			antebraco_esquerda,
			antebraco_direita,
			altura,
			peso
		) values (
		  $1,
			$2,
			$3,
			$4,
			$5,
			$6,
			$7,
			$8,
			$9,
			$10,
			$11,
			$12,
			$13,
			$14
    ) 
	`
	_, err = d.db.ExecContext(ctx, q, data.IDUser, data.AvaliationDate, data.PersonalTrainer, data.BicepsLeft, data.BicepsRight, data.CalfLeft, data.CalfRight, data.ThighLeft, data.ThighRight, data.Chest, data.ForearmLeft, data.ForearmRight, data.Height, data.Weight)
	return
}

func (d *DAO) UpdateMuscleAssesment(ctx context.Context, data model.MuscleAssesmentInput) (rowsAffected int64, err error) {
	q := `
		update avaliacao_fisica set
			id_usuario = $1,
			data_avaliacao = $2,
			avaliador_fisico = $3,
			biceps_esquerda = $4,
			biceps_direita = $5,
			panturrilha_esquerda = $6,
			panturrilha_direita = $7,
			coxa_esquerda = $8,
			coxa_direita = $9,
			torax = $10,
			antebraco_esquerda = $11,
			antebraco_direita = $12,
			altura = $13,
			peso = $14
		where id = $15
	`
	row, err := d.db.ExecContext(ctx, q, data.IDUser, data.AvaliationDate, data.PersonalTrainer, data.BicepsLeft, data.BicepsRight, data.CalfLeft, data.CalfRight, data.ThighLeft, data.ThighRight, data.Chest, data.ForearmLeft, data.ForearmRight, data.Height, data.Weight, data.ID)
	if err != nil {
		return
	}

	return row.RowsAffected()
}

func (d *DAO) DeleteMuscleAssesment(ctx context.Context, id int) (err error) {
	q := `
		delete
		from avaliacao_fisica
		where id = $1
	`
	q = d.db.Rebind(q)
	_, err = d.db.ExecContext(ctx, q, id)
	return
}

func (d *DAO) GetMuscleAssesmentByUser(ctx context.Context, idUser int) (ma *model.MuscleAssesment, err error) {
	muscleAssesment := model.MuscleAssesment{}
	q := `
		select id, 
		       id_usuario, 
					 data_avaliacao, 
					 avaliador_fisico, 
			     biceps_esquerda, 
					 biceps_direita, 
					 panturrilha_esquerda, 
					 panturrilha_direita,
			     coxa_esquerda, 
					 coxa_direita, 
					 torax, 
					 antebraco_esquerda, 
					 antebraco_direita,
					 altura,
					 peso
		from avaliacao_fisica
		where id_usuario = $1
		order by data_avaliacao desc
		limit 1
	`
	err = d.db.GetContext(ctx, &muscleAssesment, q, idUser)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return &muscleAssesment, err
}

func (d *DAO) SelectMuscleAssesmentByUser(ctx context.Context, idUser int) (mas []*model.MuscleAssesment, err error) {
	q := `
		select id, 
		       id_usuario, 
					 data_avaliacao, 
					 avaliador_fisico, 
			     biceps_esquerda, 
					 biceps_direita, 
					 panturrilha_esquerda, 
					 panturrilha_direita,
			     coxa_esquerda, 
					 coxa_direita, 
					 torax, 
					 antebraco_esquerda, 
					 antebraco_direita,
					 altura,
					 peso
		from avaliacao_fisica
		where id_usuario = $1
		order by data_avaliacao desc
	`
	err = d.db.SelectContext(ctx, &mas, q, idUser)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return
}

func (d *DAO) GetMuscleAssesmentByID(ctx context.Context, id int) (ma *model.MuscleAssesment, err error) {
	muscleAssesment := model.MuscleAssesment{}
	q := `
		select id, 
		       id_usuario, 
					 data_avaliacao, 
					 avaliador_fisico, 
			     biceps_esquerda, 
					 biceps_direita, 
					 panturrilha_esquerda, 
					 panturrilha_direita,
			     coxa_esquerda, 
					 coxa_direita, 
					 torax, 
					 antebraco_esquerda, 
					 antebraco_direita,
					 altura,
					 peso
		from avaliacao_fisica
		where id = $1
	`
	err = d.db.GetContext(ctx, &muscleAssesment, q, id)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return &muscleAssesment, err
}
