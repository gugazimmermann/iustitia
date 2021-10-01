import { Sequelize, ModelCtor } from "sequelize";
import config from "./config";

import authUsers, { AuthUsersInstance } from "./models/auth-users";
import authRoles, { AuthRolesInstance } from "./models/auth-roles";
import authRefreshToken, { AuthRefreshTokenInstance } from "./models/auth-refresh-token";
import authForgotPassword, { AuthForgotPasswordInstance } from "./models/auth-forgot-password";

import subscriptions, { SubscriptionsInstance } from "./models/subscriptions";
import subscriptionsPlans, { SubscriptionsPlansInstance  } from "./models/subscriptions-plans";
import subscriptionsPayments, { SubscriptionsPaymentsInstance } from "./models/subscriptions-payments";
import subscriptionsCreditcards, { SubscriptionsCreditcardsInstance } from "./models/subscriptions-creditcards";

import profiles, { ProfilesInstance } from "./models/profiles";

import places, { PlacesInstance } from "./models/places";

import businessContactsPersons, { BusinessContactsPersonsInstance } from "./models/business-contacts-persons";
import businessContactsCompanies, { BusinessContactsCompaniesInstance } from "./models/business-contacts-companies";

import notes, { NotesInstance } from "./models/notes";

import attachments, { AttachmentsInstance } from "./models/attchment";
import members, { MembersInstance } from "./models/members";

import scheduleEvents, { ScheduleEventsInstance } from "./models/schedule-events";


const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

export interface IDatabase {
  Sequelize: Sequelize;
  AuthUsers: ModelCtor<AuthUsersInstance>;
  AuthRoles: ModelCtor<AuthRolesInstance>;
  AuthRefreshToken: ModelCtor<AuthRefreshTokenInstance>;
  AuthForgotPassword: ModelCtor<AuthForgotPasswordInstance>;


  Subscriptions: ModelCtor<SubscriptionsInstance>;
  SubscriptionsPlans: ModelCtor<SubscriptionsPlansInstance>;
  SubscriptionsPayments: ModelCtor<SubscriptionsPaymentsInstance>;
  SubscriptionsCreditcards: ModelCtor<SubscriptionsCreditcardsInstance>;

  Profiles: ModelCtor<ProfilesInstance>;

  Places: ModelCtor<PlacesInstance>;

  BusinessContactsPersons: ModelCtor<BusinessContactsPersonsInstance>;
  BusinessContactsCompanies: ModelCtor<BusinessContactsCompaniesInstance>;

  Notes: ModelCtor<NotesInstance>;

  Attachments: ModelCtor<AttachmentsInstance>;
  Members: ModelCtor<MembersInstance>;
  ScheduleEvents: ModelCtor<ScheduleEventsInstance>;
}

const database: IDatabase = {
  Sequelize: sequelize,

  AuthUsers: authUsers(sequelize),
  AuthRoles: authRoles(sequelize),
  AuthRefreshToken: authRefreshToken(sequelize),
  AuthForgotPassword: authForgotPassword(sequelize),

  Subscriptions: subscriptions(sequelize),
  SubscriptionsPlans: subscriptionsPlans(sequelize),
  SubscriptionsPayments: subscriptionsPayments(sequelize),
  SubscriptionsCreditcards: subscriptionsCreditcards(sequelize),

  Profiles: profiles(sequelize),

  Members: members(sequelize),

  Places: places(sequelize),

  BusinessContactsPersons: businessContactsPersons(sequelize),
  BusinessContactsCompanies: businessContactsCompanies(sequelize),

  Notes: notes(sequelize),

  Attachments: attachments(sequelize),

  ScheduleEvents: scheduleEvents(sequelize),
};

// database.Sequelize.sync();

database.AuthUsers.hasOne(database.AuthRefreshToken);
database.AuthUsers.belongsToMany(database.AuthRoles, { through: { model: "auth_users_has_roles", paranoid: true } });
database.AuthRoles.belongsToMany(database.AuthUsers, { through: { model: "auth_users_has_roles", paranoid: true } });

database.SubscriptionsPlans.hasMany(database.Subscriptions);

database.Subscriptions.hasMany(database.SubscriptionsPayments);
database.AuthUsers.hasOne(database.Subscriptions);
database.AuthUsers.hasMany(database.SubscriptionsCreditcards);
database.SubscriptionsCreditcards.hasMany(database.SubscriptionsPayments);
database.AuthUsers.hasMany(database.SubscriptionsPayments);

database.AuthUsers.hasOne(database.Profiles);

database.AuthUsers.belongsToMany(database.Places, { as: 'placeManagers', through: { model: "places_has_managers" } });
database.Places.belongsToMany(database.AuthUsers, { as: 'managersPlace', through: { model: "places_has_managers" } });
database.AuthUsers.belongsToMany(database.Places, { as: 'placeUsers', through: { model: "places_has_users" } });
database.Places.belongsToMany(database.AuthUsers, { as: 'usersPlace', through: { model: "places_has_users" } });

database.AuthUsers.hasMany(database.BusinessContactsPersons);
database.Places.hasMany(database.BusinessContactsPersons);
database.BusinessContactsPersons.belongsTo(database.BusinessContactsCompanies);
database.BusinessContactsPersons.hasMany(database.Attachments);
database.BusinessContactsPersons.hasMany(database.Notes);

database.AuthUsers.hasMany(database.ScheduleEvents);
database.Places.hasMany(database.ScheduleEvents);
database.ScheduleEvents.belongsToMany(database.BusinessContactsPersons, { through: { model: "business_contacts_persons_has_schedule_events" } });
database.BusinessContactsPersons.belongsToMany(database.ScheduleEvents, { through: { model: "business_contacts_persons_has_schedule_events" } });

export default database;
