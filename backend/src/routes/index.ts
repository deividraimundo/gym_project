import { Router } from "express";
import loginRouter from "./login.routes";

const routes = Router();

// TODO: fazer middleware

routes.use("/login", loginRouter);

export default routes;
