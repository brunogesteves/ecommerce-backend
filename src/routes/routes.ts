import { Router } from "express";

import { MockApiRoutes } from "./mockapi";
import { UserRoutes } from "./usersroutes";

class Routes {
  router = Router();

  constructor() {
    this.ECommerceApi();
  }

  ECommerceApi() {
    this.router.use("/", MockApiRoutes);
    this.router.use("/user", UserRoutes);
  }
}
export default new Routes().router;
