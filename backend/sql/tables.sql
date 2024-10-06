--Usuário
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    -- Senha (Armazenar em hashes)
    email VARCHAR(100) NOT NULL,
    UNIQUE (email) -- email único
);

--Restrições Médicas
CREATE TABLE restricoes_medicas (
    id_restricao SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fumante BOOLEAN DEFAULT FALSE,
    doenca_cardiaca BOOLEAN DEFAULT FALSE,
    cirurgia BOOLEAN DEFAULT FALSE,
    observacoes VARCHAR(500),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabela imc
CREATE TABLE imc (
    id_imc SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    altura DECIMAL(5, 2) NOT NULL,
    peso DECIMAL(5, 2) NOT NULL,
    imagem VARCHAR(255),
    -- Imagem que será gerado
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Avaliação Física e Medidas
CREATE TABLE avaliacao_fisica (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    data_avaliacao DATE NOT NULL,
    avaliador_fisico VARCHAR(100),
    -- Nome do avaliador, pode mudar esse campo se fizermos um cadastro de avaliador físico
    biceps_esq DECIMAL(5, 2),
    biceps_dir DECIMAL(5, 2),
    panturrilha_esq DECIMAL(5, 2),
    panturrilha_dir DECIMAL(5, 2),
    coxa_esq DECIMAL(5, 2),
    coxa_dir DECIMAL(5, 2),
    torax DECIMAL(5, 2),
    antebraco_esq DECIMAL(5, 2),
    antebraco_dir DECIMAL(5, 2),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabela Frango Originada da tela escolha seu personagem
CREATE TABLE frango (
    id_frango SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    -- Vinculado ao usuário
    nome VARCHAR(100) NOT NULL,
    sexo CHAR(1) CHECK (sexo IN ('M', 'F')) NOT NULL,
    -- M para Masculino, F para Feminino
    personagem VARCHAR(100) NOT NULL,
    -- Escolha do personagem
    cor VARCHAR(50) NOT NULL,
    -- Cor associada
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) -- Vinculado à tabela de usuários
);

-- Tabela de Treinos
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

-- Tabela de Exercícios
CREATE TABLE exercicios (
    id SERIAL PRIMARY KEY,
    id_treino INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    series INT NOT NULL,
    repeticoes INT NOT NULL,
    descanso INT NOT NULL,
    FOREIGN KEY (id_treino) REFERENCES treinos(id_treino)
);