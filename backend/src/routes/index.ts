import { Router } from "express";
import { middleware } from "./middleware.routes";
import loginRouter from "./login.routes";
import defaultRouter from "./default.routes";

const routes = Router();

routes.use(middleware);
routes.use("/", defaultRouter);
routes.use("/login", loginRouter);

export default routes;
