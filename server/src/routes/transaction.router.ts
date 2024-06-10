"use strict";

import { Router } from "express";

const routerTransaction = Router();

routerTransaction.get("/");
routerTransaction.get("/:id");

export default routerTransaction;
