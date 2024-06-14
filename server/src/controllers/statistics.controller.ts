import { NextFunction, Request, Response } from "express";
import statisticsService from "../services/statistics.service";

class StatisticController {
  async getStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await statisticsService.getStatisticsData(req);
      return res.send({
        message: "fetching statistic",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default new StatisticController();
