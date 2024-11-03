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

-- Tabela Frango Originada da tela escolha seu personagem - (IDEIA)
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