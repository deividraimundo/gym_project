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
			antebraco_direita
		) values (
		  :id_usuario,
			:data_avaliacao,
			:avaliador_fisico,
			:biceps_esquerda,
			:biceps_direita,
			:panturrilha_esquerda,
			:panturrilha_direita,
			:coxa_esquerda,
			:coxa_direita,
			:torax,
			:antebraco_esquerda,
			:antebraco_direita
    ) 
	`
	_, err = d.db.NamedExecContext(ctx, q, data)
	return
}

func (d *DAO) UpdateMuscleAssesment(ctx context.Context, data model.MuscleAssesmentInput) (err error) {
	q := `
		update avaliacao_fisica set
			id_usuario = :id_usuario,
			data_avaliacao = :data_avaliacao,
			avaliador_fisico = :avaliador_fisico,
			biceps_esquerda = :biceps_esquerda,
			biceps_direita = :biceps_direita,
			panturrilha_esquerda = :panturrilha_esquerda,
			panturrilha_direita = :panturrilha_direita,
			coxa_esquerda = :coxa_esquerda,
			coxa_direita = :coxa_direita,
			torax = :torax,
			antebraco_esquerda = :antebraco_esquerda,
			antebraco_direita = :antebraco_direita
		where id = :id
	`
	_, err = d.db.NamedExecContext(ctx, q, data)
	return
}

func (d *DAO) DeleteMuscleAssesment(ctx context.Context, id int) (err error) {
	q := `
		delete
		from avaliacao_fisica
		where id = ?
	`
	_, err = d.db.ExecContext(ctx, q, id)
	return
}

func (d *DAO) GetMuscleAssesmentByUser(ctx context.Context, idUser int) (ma *model.MuscleAssesment, err error) {
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
					 antebraco_direita
		from avaliacao_fisica
		where id_usuario = $1
		order by data_avaliacao desc
		limit 1
	`
	err = d.db.GetContext(ctx, &ma, q, idUser)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return
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
					 antebraco_direita
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
					 antebraco_direita
		from avaliacao_fisica
		where id = $1
		order by data_avaliacao desc
		limit 1
	`
	err = d.db.GetContext(ctx, &ma, q, id)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return
}
