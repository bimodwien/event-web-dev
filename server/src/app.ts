"use strict";

import express, { urlencoded, Request, Response, NextFunction } from "express";
import { corsOption } from "./config";
import cors from "cors";
import routerUser from "./routes/user.routes";
import eventRouter from "./routes/event.router";
import routerTransaction from "./routes/transaction.router";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors(corsOption));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to API!!");
});

app.use("/users", routerUser);
app.use("/events", eventRouter.getRouter());
app.use("/transaction", routerTransaction);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

export default app;
