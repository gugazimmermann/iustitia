import { Sequelize, ModelCtor } from "sequelize";
import config from "./config";
import user, { UserInstance } from "./models/user";
import role, { RoleInstance } from "./models/role";
import refreshToken, { RefreshTokenInstance } from "./models/refresh-token";
import forgotPassword, { ForgotPasswordInstance } from "./models/forgot-password";
import profile, { ProfileInstance } from "./models/profile";
import office, { OfficeInstance } from "./models/office";
import people, { PeopleInstance } from "./models/people";
import plan, { PlansInstance } from "./models/plan";
import subscription, { SubscriptionInstance } from "./models/subscription";
import payment, { PaymentInstance } from "./models/payment";
import creditcard, { CreditcardInstance } from "./models/creditcard";
import company, { CompanyInstance } from "./models/company/company";
import contact, { ContactInstance } from "./models/contact/contact";
import contactAttachments, { ContactAttachmentsInstance } from "./models/contact/contact-attachment";
import contactNotes, { ContactNotesInstance } from "./models/contact/contact-notes";
import event, { EventInstance } from "./models/calendar/event";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

export interface IDatabase {
  Sequelize: Sequelize;
  User: ModelCtor<UserInstance>;
  Role: ModelCtor<RoleInstance>;
  RefreshToken: ModelCtor<RefreshTokenInstance>;
  ForgotPassword: ModelCtor<ForgotPasswordInstance>;
  Profile: ModelCtor<ProfileInstance>;
  Office: ModelCtor<OfficeInstance>;
  People: ModelCtor<PeopleInstance>;
  Plan: ModelCtor<PlansInstance>;
  Subscription: ModelCtor<SubscriptionInstance>;
  Payment: ModelCtor<PaymentInstance>;
  Creditcard: ModelCtor<CreditcardInstance>;
  Company: ModelCtor<CompanyInstance>;
  Contact: ModelCtor<ContactInstance>;
  ContactAttachments: ModelCtor<ContactAttachmentsInstance>;
  ContactNotes: ModelCtor<ContactNotesInstance>;
  Event: ModelCtor<EventInstance>;
}

const database: IDatabase = {
  Sequelize: sequelize,
  User: user(sequelize),
  Role: role(sequelize),
  RefreshToken: refreshToken(sequelize),
  ForgotPassword: forgotPassword(sequelize),
  Profile: profile(sequelize),
  Office: office(sequelize),
  People: people(sequelize),
  Plan: plan(sequelize),
  Subscription: subscription(sequelize),
  Payment: payment(sequelize),
  Creditcard: creditcard(sequelize),
  Company: company(sequelize),
  Contact: contact(sequelize),
  ContactAttachments: contactAttachments(sequelize),
  ContactNotes: contactNotes(sequelize),
  Event: event(sequelize),
};

// database.Sequelize.sync();

database.User.hasOne(database.RefreshToken);
database.User.belongsToMany(database.Role, { through: { model: "user_roles", paranoid: true } });
database.Role.belongsToMany(database.User, { through: { model: "user_roles", paranoid: true } });

database.Plan.hasMany(database.Subscription);
database.Subscription.hasMany(database.Payment);
database.User.hasOne(database.Subscription);
database.User.hasMany(database.Creditcard);
database.Creditcard.hasMany(database.Payment);
database.User.hasMany(database.Payment);

database.User.hasOne(database.Profile);

database.User.belongsToMany(database.Office, { as: 'officeManagers', through: { model: "office_managers" } });
database.Office.belongsToMany(database.User, { as: 'managersOffice', through: { model: "office_managers" } });
database.User.belongsToMany(database.Office, { as: 'officeUsers', through: { model: "office_users" } });
database.Office.belongsToMany(database.User, { as: 'usersOffice', through: { model: "office_users" } });

database.User.hasMany(database.Contact);
database.Office.hasMany(database.Contact);
database.Contact.belongsTo(database.Company);
database.Contact.hasMany(database.ContactAttachments);
database.Contact.hasMany(database.ContactNotes);

database.User.hasMany(database.Event);
database.Office.hasMany(database.Event);
database.Event.belongsToMany(database.Contact, { through: { model: "event_contacts", paranoid: true } });
database.Contact.belongsToMany(database.Event, { through: { model: "event_contacts", paranoid: true } });

export default database;
