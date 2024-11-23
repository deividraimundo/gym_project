package database

func (d *DAO) existsTable(tableName string) (exists bool, err error) {
	q := `
		SELECT EXISTS (
			SELECT 1
			FROM information_schema.tables 
			WHERE table_schema = 'public'
			  AND table_name = $1
		);
	`
	q = d.db.Rebind(q)
	err = d.db.Get(&exists, q, tableName)
	return
}

func (d *DAO) CreateTableUsers() (err error) {
	exists, err := d.existsTable("usuarios")
	if err != nil || exists {
		return
	}

	q := `
		CREATE TABLE usuarios (
			id SERIAL PRIMARY KEY,
			name VARCHAR(50) NOT NULL,
			last_name VARCHAR(50) NOT NULL,
			pass VARCHAR(255) NOT NULL,
			email VARCHAR(100) NOT NULL,
			UNIQUE (email)
		);
	`
	_, err = d.db.Exec(q)
	return
}

func (d *DAO) CreateTableMuscleAssesment() (err error) {
	exists, err := d.existsTable("avaliacao_fisica")
	if err != nil || exists {
		return
	}

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
			altura DECIMAL(5, 2),
			peso DECIMAL(5, 2),
    	FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
		);
	`
	_, err = d.db.Exec(q)
	return
}

func (d *DAO) CreateTableTraining() (err error) {
	exists, err := d.existsTable("treinos")
	if err != nil || exists {
		return
	}

	q := `
		CREATE TABLE treinos (
				id SERIAL PRIMARY KEY,
				id_usuario INT NOT NULL,
				titulo VARCHAR(100) NOT NULL,
				sub_titulo VARCHAR(100) NOT NULL,
				data_inicio DATE NOT NULL,
				data_fim DATE NOT NULL,
				objetivo VARCHAR(255),
				FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
		);
	`
	_, err = d.db.Exec(q)
	return
}

func (d *DAO) CreateTableExercices() (err error) {
	exists, err := d.existsTable("exercicios")
	if err != nil || exists {
		return
	}

	q := `
		CREATE TABLE exercicios (
				id SERIAL PRIMARY KEY,
				id_treino INT NOT NULL,
				nome VARCHAR(100) NOT NULL,
				series INT NOT NULL,
				repeticoes INT NOT NULL,
				descanso INT NOT NULL,
				FOREIGN KEY (id_treino) REFERENCES treinos(id)
		);
	`
	_, err = d.db.Exec(q)
	return
}

func (d *DAO) CreateTableMedicalRestrictions() (err error) {
	exists, err := d.existsTable("restricoes_medicas")
	if err != nil || exists {
		return
	}

	q := `
		CREATE TABLE restricoes_medicas (
				id SERIAL PRIMARY KEY,
				id_usuario INT NOT NULL,
				fumante BOOLEAN DEFAULT FALSE,
				doenca_cardiaca BOOLEAN DEFAULT FALSE,
				cirurgia BOOLEAN DEFAULT FALSE,
				obs VARCHAR(500),
				FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
		);
	`
	_, err = d.db.Exec(q)
	return
}
