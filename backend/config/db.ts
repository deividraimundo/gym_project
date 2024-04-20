import Client from "pg/lib/client";

// Configurações da conexão
const client: Client = new Client({
  user: "postgres", // Usuário do banco de dados
  host: "postgres", // Endereço do servidor do banco de dados
  database: "nome_do_banco_de_dados", // Nome do banco de dados
  password: "sua_senha", // Senha do banco de dados
  port: 5432, // Porta padrão do PostgreSQL
});

async function connectAndQuery() {
  try {
    // Estabelece a conexão
    await client.connect();
    console.log("Conexão bem-sucedida ao banco de dados!");

    // Executa uma consulta
    const res = await client.query("SELECT * FROM sua_tabela");
    console.log("Resultado da consulta:", res.rows);

    // Fecha a conexão após a consulta
    await client.end();
  } catch (err) {
    console.error("Erro:", err);
  }
}

// Chama a função para conectar e executar a consulta
connectAndQuery();
