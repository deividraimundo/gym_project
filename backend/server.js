const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Client } = require('pg');

const app = express();

// Conectar ao banco de dados PostgreSQL
const client = new Client({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'academia',
  password: '123456789',
  port: 5432,
});
client.connect()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err));

app.use(bodyParser.json());

// Rota para registro de usuário
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário já existe
    const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).send({ message: 'O usuário já existe.' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir novo usuário no banco de dados
    await client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);

    res.status(201).send({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).send({ message: 'Erro no registro.' });
  }
});

// Rota para login de usuário
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário no banco de dados
    const user = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Senha incorreta.' });
    }

    // Gerar token de autenticação
    const token = jwt.sign({ userId: user.rows[0].id }, 'your_secret_key');

    res.status(200).send({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).send({ message: 'Erro no login.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));