package config

import (
	"fmt"

	"gitalpha.com/go/lib/sqldm"
	"github.com/jmoiron/sqlx"
)

// ConnectDB realiza a conexão com o banco de dados
func (d *DBConfig) ConnectDB() (*sqlx.DB, error) {
	conStr := fmt.Sprintf("%s/%s@%s:%d/%s", d.User, d.Pass, d.Host, d.Port, d.Name) // Conexao com o postgres
	// Abre uma conexao com o banco de dados
	db, err := sqlx.Open(d.Driver, conStr)
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
