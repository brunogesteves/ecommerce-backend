import express from "express";
import cors from "cors";
import { Routes } from "./routes/index";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.routes();
  }

  routes() {
    this.app.use(cors());
    this.app.use("/", Routes);
  }
  listen(port: number) {
    this.app.listen(port, () =>
      console.log(`Server running on port "${port}"...`)
    );
  }
}

export default new App();
