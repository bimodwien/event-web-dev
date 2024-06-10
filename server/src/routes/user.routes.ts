"use strict";

import { Router } from "express";
import UserController from "../controllers/user.controller";
import { blobUploader } from "../lib/multer";
import {
  validateRefreshToken,
  validateToken,
} from "../middlewares/auth.middleware";

const routerUser = Router();

routerUser.post("/v1", UserController.register);
routerUser.post("/v2", UserController.login);
routerUser.get("/v3", validateRefreshToken, UserController.validateUser);
routerUser.patch("/v4", UserController.verifiedUser);
routerUser.post("/v5", UserController.requestReset);
routerUser.post("/v6", UserController.resetPassword);
routerUser.put(
  "/v7",
  validateToken,
  blobUploader().single("imageProfile"),
  UserController.editProfile
);
routerUser.get("/avatar/:id", UserController.renderAvatar);

export default routerUser;
