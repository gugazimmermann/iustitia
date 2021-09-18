import { Sequelize, ModelCtor } from "sequelize";
import config from "./config";
import user, { UserInstance } from "./models/user";
import refreshToken, { RefreshTokenInstance } from "./models/refreshToken";
import forgotPassword, { ForgotPasswordInstance } from "./models/forgotPassword";
import profile, { ProfileInstance } from "./models/profile";
import office, { OfficeInstance } from "./models/office";
import plan, { PlansInstance } from "./models/plan";
import subscription, { SubscriptionInstance } from "./models/subscription";
import payment, { PaymentInstance } from "./models/payment";
import creditcard, { CreditcardInstance } from "./models/creditcard";
import contact, { ContactInstance } from "./models/contact";
import contactAttachments, { ContactAttachmentsInstance } from "./models/contactAttachment";

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
  Plan: ModelCtor<PlansInstance>;
  Subscription: ModelCtor<SubscriptionInstance>;
  Payment: ModelCtor<PaymentInstance>;
  Creditcard: ModelCtor<CreditcardInstance>;
  Contact: ModelCtor<ContactInstance>;
  ContactAttachments: ModelCtor<ContactAttachmentsInstance>;
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
  Creditcard: creditcard(sequelize),
  Contact: contact(sequelize),
  ContactAttachments: contactAttachments(sequelize)
};

// database.Sequelize.sync();

database.User.hasOne(database.RefreshToken);

database.Plan.hasMany(database.Subscription);
database.Subscription.hasMany(database.Payment);
database.User.hasOne(database.Subscription);
database.User.hasMany(database.Creditcard);
database.Creditcard.hasMany(database.Payment);
database.User.hasMany(database.Payment);

database.User.hasOne(database.Profile);

database.User.belongsToMany(database.Office, { through: { model: "user_office", paranoid: true } });
database.Office.belongsToMany(database.User, { through: { model: "user_office", paranoid: true } });

database.User.hasMany(database.Contact);
database.Office.hasMany(database.Contact);
database.Contact.hasMany(database.ContactAttachments);

export default database;
