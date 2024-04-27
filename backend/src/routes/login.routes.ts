import { Router, Request, Response } from "express";
import LoginRepository from "../repositories/LoginRepository";

const loginRouter = Router();
const loginRepository = new LoginRepository();

loginRouter.get("/", (request: Request, response: Response) => {
  response.json(loginRepository.find());
});

loginRouter.get("/:id", (request: Request, response: Response) => {
  throw Error("nao implementado");
});

export default loginRouter;
