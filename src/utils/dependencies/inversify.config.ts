import "reflect-metadata";
import { Container } from "inversify";
import AppPropertiesModel from "../models/app_properties_model.js";
import COMMON_DI_TYPES from "./common_di_types.js";
import ILogger from "../log/ilogger.js";
import CACELogger from "../log/cace_logger.js";
import IDataSource from "../datasources/idatasource.js";
import MongooseDataSource from "../datasources/mongoose_datasource.js";
import AppConfig from "../../config/app_config.js";
import ProductDIContainer from "../../features/product/utils/dependencies/product_di_container.js";

class DIContainer {
  private _container: Container;

  public get container(): Container {
    return this._container;
  }

  constructor() {
    this._container = new Container();
    this.setUp();
  }

  private setUp() {
    this.bindAppConfig();
    this.bindDataSource();
    this.bindLogger();
    this.bindAppProperties();
    this.bindFeatures();
  }

  private bindAppConfig() {
    this._container
      .bind<AppConfig>(COMMON_DI_TYPES.AppConfig)
      .to(AppConfig)
      .inSingletonScope();
  }

  private bindLogger() {
    this._container
      .bind<ILogger>(COMMON_DI_TYPES.ILogger)
      .to(CACELogger)
      .inSingletonScope();
  }

  private bindDataSource() {
    this._container
      .bind<IDataSource>(COMMON_DI_TYPES.IDataSource)
      .to(MongooseDataSource)
      .inSingletonScope();
  }

  private bindAppProperties() {
    this._container
      .bind<AppPropertiesModel>(COMMON_DI_TYPES.AppPropertiesModel)
      .to(AppPropertiesModel)
      .inSingletonScope();
  }

  private bindFeatures() {
    const product = new ProductDIContainer(this._container);
    product.bind();
  }
}

const container = new DIContainer().container;

export { container };
