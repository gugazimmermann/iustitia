import * as Sequelize from "sequelize";
import { dbConfig } from "../config";
import userModel from "./models/user";
import refreshToken from "./models/refreshToken";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});
const db = {};
db.sequelize = sequelize;
db.user = userModel(sequelize);
db.refreshToken = refreshToken(sequelize);

db.refreshToken.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });
db.user.hasOne(db.refreshToken, { oreignKey: 'userId', targetKey: 'id' });

export default db;
