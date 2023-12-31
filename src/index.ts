import "reflect-metadata";
import dotenv from "dotenv";
import AppConfig from "./config/appConfig.js";
import COMMON_DI_TYPES from "./utils/dependencies/commonDITypes.js";
import { DIContainer } from "./utils/dependencies/inversify.config.js";

// https://pvictorsys.medium.com/dependency-injection-in-typescript-with-inversify-e956fa28b668

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

class ServerApp {
  public static async run(): Promise<void> {
    const container = new DIContainer().container;
    const app = container.get<AppConfig>(COMMON_DI_TYPES.AppConfig).express;

    app.listen(process.env.port, () => {
      console.log(`Server is running on port ${process.env.port}`);
    });
  }
}

ServerApp.run();
