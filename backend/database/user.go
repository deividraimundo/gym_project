package database

import (
	"context"
	"database/sql"
	"errors"
	"gym_project/model"

	"github.com/jmoiron/sqlx"
)

func InsertUser(ctx context.Context, tx *sqlx.Tx, data *model.SignUpInput) (err error) {
	id, err := GetNextSequence("usuarios_id_seq", tx)
	if err != nil {
		return err
	}
	data.ID = id
	q := `
		insert into usuarios (
		  id,
			name,
			last_name,
			pass,
			email
		) values (
			$1,
			$2,
			$3,
			$4,
			$5
		)
	`
	_, err = tx.ExecContext(ctx, q, data.ID, data.Name, data.LastName, data.Password, data.Email)
	return
}

func (d *DAO) GetUser(username, password string) (user *model.User, err error) {
	u := &model.User{}
	q := `
		select id,
		       name,
					 last_name,
					 email
		from usuarios
		where (name = $1 or email = $2)
		  and pass = $3
	`
	err = d.db.Get(u, q, username, username, password)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return u, err
}
