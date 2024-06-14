import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware";
import { verifyEventOrganizer } from "../middlewares/role.middleware";
import statisticsController from "../controllers/statistics.controller";

class StatisticRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }

  initializedRoutes() {
    this.router.get(
      "/",
      validateToken,
      verifyEventOrganizer,
      statisticsController.getStatistic
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new StatisticRouter();
