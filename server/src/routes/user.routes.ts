"use strict";

import { Router } from "express";
import UserController from "../controllers/user.controller";
import { blobUploader } from "../lib/multer";
import { validateRefreshToken } from "../middlewares/auth.middleware";

const routerUser = Router();

routerUser.post("/v1", blobUploader().single("image"), UserController.register);
routerUser.post("/v2", UserController.login);
routerUser.get("/v3", validateRefreshToken, UserController.validateUser);
routerUser.patch("/v4", UserController.verifiedUser);
routerUser.get("/avatar/:id", UserController.renderAvatar);

export default routerUser;
