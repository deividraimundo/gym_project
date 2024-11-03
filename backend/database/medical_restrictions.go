package database

import (
	"context"
	"database/sql"
	"errors"
	"gym_project/model"
)

func (d *DAO) InsertMedicalRestrictions(ctx context.Context, data model.MedicalRestrictionsInput) (err error) {
	q := `
		insert into restricoes_medicas (
			id_usuario,
			fumante,
			doenca_cardiaca,
			cirurgia,
			obs
		) values (
			$1, 
			$2, 
			$3, 
			$4, 
			$5
		)
	`
	_, err = d.db.ExecContext(ctx, q, data.IDUser, data.Smoker, data.HeartDisease, data.Surgery, data.Obs)
	return
}

func (d *DAO) UpdateMedicalRestrictions(ctx context.Context, data model.MedicalRestrictionsInput) (rowsAffected int64, err error) {
	q := `
		update restricoes_medicas set
			id_usuario = $1,
			fumante = $2,
			doenca_cardiaca = $3,
			cirurgia = $4,
			obs = $5
		where id = $6
	`
	row, err := d.db.ExecContext(ctx, q, data.IDUser, data.Smoker, data.HeartDisease, data.Surgery, data.Obs, data.ID)
	if err != nil {
		return
	}

	return row.RowsAffected()
}

func (d *DAO) DeleteMedicalRestrictions(ctx context.Context, id int) (err error) {
	q := `
		delete
		from restricoes_medicas
		where id = $1
	`
	q = d.db.Rebind(q)
	_, err = d.db.ExecContext(ctx, q, id)
	return
}

func (d *DAO) SelectMedicalRestrictionsByUser(ctx context.Context, idUser int) (mr []*model.MedicalRestrictions, err error) {
	medicalRestrictions := []*model.MedicalRestrictions{}
	q := `
		select id, 
		       id_usuario,
					 fumante,
					 doenca_cardiaca,
					 cirurgia,
					 obs
		from restricoes_medicas
		where id_usuario = $1
		order by id desc
	`
	err = d.db.SelectContext(ctx, &medicalRestrictions, q, idUser)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return medicalRestrictions, err
}

func (d *DAO) GetMedicalRestrictionsByID(ctx context.Context, id int) (mr *model.MedicalRestrictions, err error) {
	medicalRestrictions := model.MedicalRestrictions{}
	q := `
		select id, 
		       id_usuario,
					 fumante,
					 doenca_cardiaca,
					 cirurgia,
					 obs
		from restricoes_medicas
		where id = $1
	`
	err = d.db.GetContext(ctx, &medicalRestrictions, q, id)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return &medicalRestrictions, err
}
