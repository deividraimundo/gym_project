package database

import (
	"database/sql"
	"errors"
	"gym_project/model"
)

func (d *DAO) GetUser(username, password string) (user *model.User, err error) {
	q := `
		select id,
		       name,
					 last_name,
					 email
		from user
		where (name = $1 or email = $2)
		  and pass = $3
	`
	err = d.db.Get(&user, q, username, username, password)
	if errors.Is(err, sql.ErrNoRows) {
		err = nil
	}
	return
}
