package database

func (d *DAO) CreateTableMuscleAssesment() (err error) {
	q := `
		CREATE TABLE avaliacao_fisica (
			id SERIAL PRIMARY KEY,
			id_usuario INT NOT NULL,
			data_avaliacao DATE NOT NULL,
			avaliador_fisico VARCHAR(100),
			biceps_esquerda DECIMAL(5, 2),
			biceps_direita DECIMAL(5, 2),
			panturrilha_esquerda DECIMAL(5, 2),
			panturrilha_direita DECIMAL(5, 2),
			coxa_esquerda DECIMAL(5, 2),
			coxa_direita DECIMAL(5, 2),
			torax DECIMAL(5, 2),
			antebraco_esquerda DECIMAL(5, 2),
			antebraco_direita DECIMAL(5, 2),
    	FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
		);
	`
	_, err = d.db.Exec(q)
	return
}

func (d *DAO) CreateTableTraining() (err error) {
	q := `
		CREATE TABLE treinos (
				id SERIAL PRIMARY KEY,
				id_usuario INT NOT NULL,
				titulo VARCHAR(100) NOT NULL,
				sub_titulo VARCHAR(100) NOT NULL,
				data_inicio DATE NOT NULL,
				data_fim DATE NOT NULL,
				objetivo VARCHAR(255),
				FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
		);
	`
	_, err = d.db.Exec(q)
	return
}

func (d *DAO) CreateTableExercices() (err error) {
	q := `
		CREATE TABLE exercicios (
				id SERIAL PRIMARY KEY,
				id_treino INT NOT NULL,
				nome VARCHAR(100) NOT NULL,
				series INT NOT NULL,
				repeticoes INT NOT NULL,
				descanso INT NOT NULL,
				FOREIGN KEY (id_treino) REFERENCES treinos(id_treino)
		);
	`
	_, err = d.db.Exec(q)
	return
}
