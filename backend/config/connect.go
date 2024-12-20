package config

import (
	"fmt"

	"gitalpha.com/go/lib/sqldm"
	"github.com/jmoiron/sqlx"
)

// ConnectDB realiza a conexão com o banco de dados
func (d *DBConfig) ConnectDB() (*sqlx.DB, error) {
	connStr := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%d sslmode=disable", d.User, d.Pass, d.Name, d.Host, d.Port)
	// Abre uma conexao com o banco de dados
	db, err := sqlx.Open(d.Driver, connStr)
	if err != nil {
		return nil, fmt.Errorf("erro ao abrir conexao com o banco: %w", err)
	}

	// Pinga no banco para verificar se a conexao esta estavel
	err = db.Ping()
	if err != nil {
		return nil, fmt.Errorf("erro ao pingar no banco no banco: %w", err)
	}

	// Cria um mapeamento para scan do banco na tag db
	sqldm.SetMapper(db)
	sqlx.BindDriver("oracle", sqlx.NAMED)
	return db, nil
}
