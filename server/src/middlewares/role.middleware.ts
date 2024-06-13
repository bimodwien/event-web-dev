import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

export const verifyEventOrganizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.role !== "eventOrganizer") {
    return res.status(403).json({
      message: "Unauthorized: Only event organizers can accses",
    });
  }

  next();
};

export const verifyCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // console.log("ini user di middleware role", user);

  if (!user || user.role !== "customer") {
    return res.status(403).json({
      message: "Unauthorized: Only customer can accses.",
    });
  }

  next();
};
