// "use strict";

// import express, { urlencoded, Request, Response, NextFunction } from "express";
// import { corsOption } from "./config";
// import cors from "cors";
// import routerUser from "./routes/user.routes";

// const app = express();

// app.use(express.json());
// app.use(urlencoded({ extended: true }));
// app.use(cors(corsOption));

// app.get("/", (req: Request, res: Response) => {
//   res.send("Welcome to API!!");
// });

// app.use("/users", routerUser);

// app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
//   if (error instanceof Error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// });

// export default app;

import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { PORT, corsOption } from "./config";
import eventRouter from "./routes/event.router";
import userRoutes from "./routes/user.routes";

export class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandler();
  }

  private routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("welcome to api with prisma API");
    });

    this.app.use("/users", userRoutes.getRouter());
    this.app.use("/events", eventRouter.getRouter());
  }

  private errorHandler() {
    this.app.use("/*", (req: Request, res: Response) => {
      res.status(404).send("page not found");
    });

    this.app.use(
      (error: unknown, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof Error)
          res.status(500).send({
            message: error.message,
          });
      }
    );
  }

  private configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(cors(corsOption));
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log("api is running on port", PORT);
    });
  }
}
