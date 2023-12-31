import { inject, injectable } from "inversify";
import IDataSource from "./idatasource.js";
import AppPropertiesModel from "../models/appPropertiesModel.js";
import COMMON_DI_TYPES from "../dependencies/commonDITypes.js";
import mongoose from "mongoose";

@injectable()
export default class MongooseDataSource implements IDataSource {
  constructor(
    @inject(COMMON_DI_TYPES.AppPropertiesModel)
    private readonly _appProperties: AppPropertiesModel
  ) {}

  async openConnection(): Promise<void> {
    await mongoose.connect(this._appProperties.mongodbUrl, {
      autoIndex: false,
      dbName: this._appProperties.mongodbDatabase,
    });
  }
  async closeConnection(): Promise<void> {
    await mongoose.connection.close();
  }
}
