import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { PORT, corsOption } from "./config/index";
import routerUser from "./routes/user.routes";
import eventRouter from "./routes/event.router";

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

    this.app.use("/users", routerUser);
    this.app.use("/event", eventRouter.getRouter());
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
