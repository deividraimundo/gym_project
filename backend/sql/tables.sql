--Usuário

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY, 
    usuario VARCHAR(50) NOT NULL, 
    senha VARCHAR(255) NOT NULL, -- Senha (Armazenar em hashes)
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
    imagem VARCHAR(255), -- Imagem que será gerado
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) 
);

-- Avaliação Física e Medidas

CREATE TABLE avaliacao_fisica (
    id_avaliacao SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    data_avaliacao DATE NOT NULL,
    avaliador_fisico VARCHAR(100), -- Nome do avaliador, pode mudar esse campo se fizermos um cadastro de avaliador físico
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
    id_usuario INT NOT NULL, -- Vinculado ao usuário
    sexo CHAR(1) CHECK (sexo IN ('M', 'F')) NOT NULL, -- M para Masculino, F para Feminino
    personagem VARCHAR(100) NOT NULL, -- Escolha do personagem
    cor VARCHAR(50) NOT NULL, -- Cor associada
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) -- Vinculado à tabela de usuários
);



