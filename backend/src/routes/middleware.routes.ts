import { NextFunction, Request, Response } from "express";
import { env } from "../config/config";

export async function middleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let auth = request.headers["authorization"];
  if (auth == "") {
    auth = request.headers["authorization"];
  }

  if (auth !== env.MIDDLEWARE && request.path !== "/") {
    response.setHeader("Content-Type", "application/json");
    response.status(401).json({
      code: "401 - Status Bad Request",
      message: "invalid authorization",
    });
    return;
  }

  next();
}
