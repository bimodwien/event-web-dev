// "use strict";

// import { Router } from "express";
// import UserController from "../controllers/user.controller";
// import { blobUploader } from "../lib/multer";
// import { validateRefreshToken } from "../middlewares/auth.middleware";

// const routerUser = Router();

// routerUser.post("/v1", blobUploader().single("image"), UserController.register);
// routerUser.post("/v2", UserController.login);
// routerUser.get("/v3", validateRefreshToken, UserController.validateUser);
// routerUser.patch("/v4", UserController.verifiedUser);
// routerUser.get("/avatar/:id", UserController.renderAvatar);

// export default routerUser;

import { Router } from "express";
import UserController from "../controllers/user.controller";
import { validateRefreshToken } from "../middlewares/auth.middleware";
import { blobUploader } from "../lib/multer";

class UserRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }
  initializedRoutes() {
    this.router.post(
      "/v1",
      blobUploader().single("image"),
      UserController.register
    );
    this.router.post("/v2", UserController.login);
    this.router.get("/v3", validateRefreshToken, UserController.validateUser);
    this.router.patch("/v4", UserController.verifiedUser);
    this.router.get("/avatar/:id", UserController.renderAvatar);
  }

  getRouter() {
    return this.router;
  }
}
export default new UserRouter();
