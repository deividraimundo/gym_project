package database

import (
	"gym_project/config"

	"github.com/jmoiron/sqlx"
)

// DAO - Struct que representa a conexão com o banco de dados
type DAO struct {
	db *sqlx.DB
}

// New - retorna a DAO com a conexão com o banco de dados
func New(cfg *config.DBConfig) (*DAO, error) {
	db, err := cfg.ConnectDB()
	if err != nil {
		return nil, err
	}

	return &DAO{db: db}, nil
}

// Close - finaliza a conexão do banco de dados
func (d *DAO) Close() error {
	return d.db.Close()
}

// DB - retorna a conexão com o db
func (d *DAO) DB() *sqlx.DB {
	return d.db
}
