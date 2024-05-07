import z from "zod";

// Definindo o schema Zod para adicionar as configurações do banco de dados
const envDatabaseSchema = z.object({
  USER: z.string(),
  PASSWORD: z.string(),
  NAME: z.string(),
  HOST: z.string(),
  PORT: z.number(),
});

// Definindo o schema Zod para adicionar as configurações
const envSchema = z.object({
  PORT: z.number().default(3000),
  MIDDLEWARE: z.string().default("Bearer teste"),
  NODE_ENV: z.string().default("homologacao"),
  DATABASE: envDatabaseSchema.optional(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
