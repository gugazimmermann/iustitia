import { Sequelize, ModelCtor } from "sequelize";
import config from "./config";
import user, { UserInstance } from "./models/user";
import refreshToken, { RefreshTokenInstance } from "./models/refreshToken";
import forgotPassword, { ForgotPasswordInstance } from "./models/forgotPassword";
import profile, { ProfileInstance } from "./models/profile";
import office, { OfficeInstance } from "./models/office";
import plan, { PlasnInstance } from "./models/plan";
import subscription, { SubscriptionInstance } from "./models/subscription";
import payment, { PaymentInstance } from "./models/payments";
import creditcard, { CreditcardInstance } from "./models/creditcard";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

export interface IDatabase {
  Sequelize: Sequelize;
  User: ModelCtor<UserInstance>;
  RefreshToken: ModelCtor<RefreshTokenInstance>;
  ForgotPassword: ModelCtor<ForgotPasswordInstance>;
  Profile: ModelCtor<ProfileInstance>;
  Office: ModelCtor<OfficeInstance>;
  Plan: ModelCtor<PlasnInstance>;
  Subscription: ModelCtor<SubscriptionInstance>;
  Payment: ModelCtor<PaymentInstance>;
  Creditcard: ModelCtor<CreditcardInstance>;
}

const database: IDatabase = {
  Sequelize: sequelize,
  User: user(sequelize),
  RefreshToken: refreshToken(sequelize),
  ForgotPassword: forgotPassword(sequelize),
  Profile: profile(sequelize),
  Office: office(sequelize),
  Plan: plan(sequelize),
  Subscription: subscription(sequelize),
  Payment: payment(sequelize),
  Creditcard: creditcard(sequelize)
};

// database.Sequelize.sync();

database.RefreshToken.belongsTo(database.User, { foreignKey: "userId", targetKey: "id" });
database.User.hasMany(database.RefreshToken, { foreignKey: "userId", sourceKey: "id" });

database.Profile.belongsTo(database.User, { foreignKey: "userId", targetKey: "id" });
database.User.hasOne(database.Profile, { foreignKey: "userId", sourceKey: "id" });

database.Subscription.belongsTo(database.User, { foreignKey: "userId", targetKey: "id" });
database.User.hasOne(database.Subscription, { foreignKey: "userId", sourceKey: "id" });

database.Payment.belongsTo(database.User, { foreignKey: "userId", targetKey: "id" });
database.User.hasMany(database.Payment, { foreignKey: "userId", sourceKey: "id" });

database.Payment.belongsTo(database.User, { foreignKey: "userId", targetKey: "id" });
database.User.hasOne(database.Payment, { foreignKey: "userId", sourceKey: "id" });

export default database;
