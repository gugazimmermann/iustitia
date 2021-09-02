import { Sequelize, ModelCtor } from "sequelize";
import config from "./config";
import user, { UserInstance } from "./models/user";
import refreshToken, { RefreshTokenInstance } from "./models/refreshToken";
import forgotPassword, { ForgotPasswordInstance } from "./models/forgotPassword";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: 'postgres',
});

export interface IDatabase {
  Sequelize: Sequelize;
  User: ModelCtor<UserInstance>;
  RefreshToken: ModelCtor<RefreshTokenInstance>;
  ForgotPassword: ModelCtor<ForgotPasswordInstance>
}

const database: IDatabase = {
  Sequelize: sequelize,
  User: user(sequelize),
  RefreshToken: refreshToken(sequelize),
  ForgotPassword: forgotPassword(sequelize)
};

database.Sequelize.sync();

database.RefreshToken.belongsTo(database.User, { foreignKey: "userId", targetKey: "id" });
database.User.hasOne(database.RefreshToken, { foreignKey: "userId", sourceKey: "id" });

export default database;
