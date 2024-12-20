package database

import (
	"fmt"

	"github.com/jmoiron/sqlx"
)

func (d *DAO) Transactionally(fn func(*sqlx.Tx) error) error {

	tx, err := d.db.Beginx()
	if err != nil {
		return fmt.Errorf("nao pode iniciar transaction: %w", err)
	}

	if err := fn(tx); err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("nao pode efetuar commit: %w", err)
	}

	return nil
}

func GetNextSequence(sq string, tx *sqlx.Tx) (int, error) {
	var id int
	q := `
		select nextval($1);
	`
	q = tx.Rebind(q)
	err := tx.Get(&id, q, sq)
	return id, err
}
