import { Sequelize, ModelCtor } from "sequelize";
import config from "./config";
import attachments, { AttachmentsInstance } from "./models/attachments/attachment";
import forgotPassword, { ForgotPasswordInstance } from "./models/auth/forgot-password";
import refreshToken, { RefreshTokenInstance } from "./models/auth/refresh-token";
import roles, { RolesInstance } from "./models/auth/roles";
import users, { UsersInstance } from "./models/auth/users";
import companies, { CompaniesInstance } from "./models/business-contacts/companies";
import persons, { PersonsInstance } from "./models/business-contacts/persons";
import members, { MembersInstance } from "./models/members/members";
import notes, { NotesInstance } from "./models/notes/notes";
import places, { PlacesInstance } from "./models/places/places";
import profiles, { ProfilesInstance } from "./models/profiles/profiles";
import events, { EventsInstance } from "./models/schedule/events";
import creditcards, { CreditcardsInstance } from "./models/subscriptions/creditcards";
import payments, { PaymentsInstance } from "./models/subscriptions/payments";
import plans, { PlansInstance } from "./models/subscriptions/plans";
import subscriptions, { SubscriptionsInstance } from "./models/subscriptions/subscriptions";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

export interface IDatabase {
  Sequelize: Sequelize;
  Attachments: ModelCtor<AttachmentsInstance>;
  ForgotPassword: ModelCtor<ForgotPasswordInstance>;
  RefreshToken: ModelCtor<RefreshTokenInstance>;
  Roles: ModelCtor<RolesInstance>;
  Users: ModelCtor<UsersInstance>;
  Companies: ModelCtor<CompaniesInstance>;
  Persons: ModelCtor<PersonsInstance>;
  Members: ModelCtor<MembersInstance>;
  Notes: ModelCtor<NotesInstance>;
  Places: ModelCtor<PlacesInstance>;
  Profiles: ModelCtor<ProfilesInstance>;
  Events: ModelCtor<EventsInstance>;
  Creditcards: ModelCtor<CreditcardsInstance>;
  Payments: ModelCtor<PaymentsInstance>;
  Plans: ModelCtor<PlansInstance>;
  Subscriptions: ModelCtor<SubscriptionsInstance>;
}

const database: IDatabase = {
  Sequelize: sequelize,
  Attachments: attachments(sequelize),
  ForgotPassword: forgotPassword(sequelize),
  RefreshToken: refreshToken(sequelize),
  Roles: roles(sequelize),
  Users: users(sequelize),
  Companies: companies(sequelize),
  Persons: persons(sequelize),
  Members: members(sequelize),
  Notes: notes(sequelize),
  Places: places(sequelize),
  Profiles: profiles(sequelize),
  Events: events(sequelize),
  Creditcards: creditcards(sequelize),
  Payments: payments(sequelize),
  Plans: plans(sequelize),
  Subscriptions: subscriptions(sequelize),
};

// database.Sequelize.sync();

database.Users.hasOne(database.RefreshToken);
database.Users.belongsToMany(database.Roles, { through: { model: "user_roles", paranoid: true } });
database.Roles.belongsToMany(database.Users, { through: { model: "user_roles", paranoid: true } });

database.Plans.hasMany(database.Subscriptions);
database.Subscriptions.hasMany(database.Payments);
database.Users.hasOne(database.Subscriptions);
database.Users.hasMany(database.Creditcards);
database.Creditcards.hasMany(database.Payments);
database.Users.hasMany(database.Payments);

database.Users.hasOne(database.Profiles);

database.Users.belongsToMany(database.Places, { as: 'officeManagers', through: { model: "office_managers" } });
database.Places.belongsToMany(database.Users, { as: 'managersOffice', through: { model: "office_managers" } });
database.Users.belongsToMany(database.Places, { as: 'officeUsers', through: { model: "office_users" } });
database.Places.belongsToMany(database.Users, { as: 'usersOffice', through: { model: "office_users" } });

database.Users.hasMany(database.Persons);
database.Places.hasMany(database.Persons);
database.Persons.belongsTo(database.Companies);
database.Persons.hasMany(database.Attachments);
database.Persons.hasMany(database.Notes);

database.Users.hasMany(database.Events);
database.Places.hasMany(database.Events);
database.Events.belongsToMany(database.Persons, { through: { model: "event_contacts", paranoid: true } });
database.Persons.belongsToMany(database.Events, { through: { model: "event_contacts", paranoid: true } });

export default database;
