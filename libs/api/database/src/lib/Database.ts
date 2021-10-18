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

database.Users.belongsToMany(database.Places, { as: 'placeManagers', through: { model: "place_managers" } });
database.Places.belongsToMany(database.Users, { as: 'managersPlace', through: { model: "place_managers" } });
database.Users.belongsToMany(database.Places, { as: 'placeEmployees', through: { model: "place_employees" } });
database.Places.belongsToMany(database.Users, { as: 'employeesPlace', through: { model: "place_employees" } });

database.Persons.belongsToMany(database.Users, { as: 'userClients', through: { model: "user_clients" } });
database.Users.belongsToMany(database.Persons, { as: 'clientsUser', through: { model: "user_clients" } });
database.Persons.belongsToMany(database.Users, { as: 'userSupliers', through: { model: "user_supliers" } });
database.Users.belongsToMany(database.Persons, { as: 'supliersUser', through: { model: "user_supliers" } });
database.Persons.belongsToMany(database.Users, { as: 'userContacts', through: { model: "user_contacts" } });
database.Users.belongsToMany(database.Persons, { as: 'contactsUser', through: { model: "user_contacts" } });

database.Persons.belongsToMany(database.Places, { as: 'placeClients', through: { model: "place_clients" } });
database.Places.belongsToMany(database.Persons, { as: 'clientsPlace', through: { model: "place_clients" } });
database.Persons.belongsToMany(database.Places, { as: 'placeSupliers', through: { model: "place_supliers" } });
database.Places.belongsToMany(database.Persons, { as: 'supliersPlace', through: { model: "place_supliers" } });
database.Persons.belongsToMany(database.Places, { as: 'placeContacts', through: { model: "place_contacts" } });
database.Places.belongsToMany(database.Persons, { as: 'contactsPlace', through: { model: "place_contacts" } });

database.Persons.belongsTo(database.Companies);
database.Persons.hasMany(database.Attachments);
database.Persons.hasMany(database.Notes);

database.Users.hasMany(database.Events);
database.Places.hasMany(database.Events);
database.Events.belongsToMany(database.Persons, { through: { model: "event_contacts", paranoid: true } });
database.Persons.belongsToMany(database.Events, { through: { model: "event_contacts", paranoid: true } });

export default database;
