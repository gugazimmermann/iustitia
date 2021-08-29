import * as Sequelize from "sequelize";
import config from "./config";
import { userModel } from "./models";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});
const db = {};
db.sequelize = sequelize;
db.user = userModel(sequelize);

export default db;
