import { Pool } from "pg";
import { env } from "./config";

const pool = new Pool({
  user: env.DATABASE?.USER,
  password: env.DATABASE?.PASSWORD,
  host: env.DATABASE?.HOST,
  port: env.DATABASE?.PORT,
  database: env.DATABASE?.NAME,
});

export class Database {
  public async up(): Promise<void> {
    try {
      await pool.connect();
      console.log("Conection with database was successfully.");
    } catch (error) {
      console.error("Error opening database connection:", error);
      throw error;
    }
  }

  public async down(): Promise<void> {
    try {
      await pool.end();
      console.log("Connection with database was closed successfully.");
    } catch (error) {
      console.error("Error closing database connection:", error);
      throw error;
    }
  }

  public db(): Pool {
    // Retorna o pool de conexões para usar a biblioteca do banco de dados
    return pool;
  }
}
