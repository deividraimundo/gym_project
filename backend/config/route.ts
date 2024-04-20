import express, { Request, Response } from 'express';

// Crie uma instância do roteador do Express
const router = express.Router();

// Rota padrão
router.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo à API da sua academia!');
});

// Rota para listar todos os alunos
router.get('/alunos', (req: Request, res: Response) => {
  // Lógica para obter e retornar todos os alunos da academia
  res.send('Rota para listar todos os alunos');
});

// Rota para obter informações de um aluno específico
router.get('/alunos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  // Lógica para buscar e retornar informações do aluno com o ID fornecido
  res.send(`Rota para obter informações do aluno com o ID ${id}`);
});

// Rota para adicionar um novo aluno
router.post('/alunos', (req: Request, res: Response) => {
  // Lógica para adicionar um novo aluno à academia
  res.send('Rota para adicionar um novo aluno');
});

// Rota para atualizar informações de um aluno existente
router.put('/alunos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  // Lógica para atualizar informações do aluno com o ID fornecido
  res.send(`Rota para atualizar informações do aluno com o ID ${id}`);
});

// Rota para excluir um aluno
router.delete('/alunos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  // Lógica para excluir o aluno com o ID fornecido
  res.send(`Rota para excluir o aluno com o ID ${id}`);
});

// Exporte o roteador para uso em outros arquivos
export default router;
