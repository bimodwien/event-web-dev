"use strict";

import { Router } from "express";
import UserController from "../controllers/user.controller";

const routerUser = Router();

routerUser.post("/v1", UserController.register);
routerUser.post("/v2", UserController.login);

export default routerUser;
