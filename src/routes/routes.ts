import { Router } from "express";

import { MockApiRoutes } from "./mockapi";

class Routes {
  router = Router();

  constructor() {
    this.ECommerceApi();
  }

  ECommerceApi() {
    this.router.use("/", MockApiRoutes);
  }
}
export default new Routes().router;
