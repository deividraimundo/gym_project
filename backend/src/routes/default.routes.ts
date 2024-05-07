import { Request, Response, Router } from "express";

const defaultRouter = Router();

defaultRouter.get("/", (request: Request, response: Response) => {
  response.status(200).json({
    message: "OK",
  });
});

export default defaultRouter;
