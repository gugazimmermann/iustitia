import {
  Sequelize,
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from "sequelize";
import { AuthRolesInstance } from "./auth-roles";
import { ProfilesInstance } from "./profiles";
import { SubscriptionsInstance } from "./subscriptions";
import { PlacesInstance } from "./places";

interface AuthUsersAttributes {
  id: string;
  email: string;
  password: string;
  tenant: string;
  active: boolean;
}

type AuthUsersCreationAttributes = Optional<AuthUsersAttributes, 'id' | 'tenant'>

export interface AuthUsersInstance
  extends Model<AuthUsersAttributes, AuthUsersCreationAttributes>,
  AuthUsersAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roles: AuthRolesInstance[];
  profile: ProfilesInstance;
  subscription: SubscriptionsInstance;
  places: PlacesInstance[];

  getRoles: HasManyGetAssociationsMixin<AuthRolesInstance>;
  addRole: HasManyAddAssociationMixin<AuthRolesInstance, number>;
  hasRole: HasManyHasAssociationMixin<AuthRolesInstance, number>;
  countRoles: HasManyCountAssociationsMixin;
  createRole: HasManyCreateAssociationMixin<AuthRolesInstance>;

  getPlaces: HasManyGetAssociationsMixin<PlacesInstance>;
  addPlace: HasManyAddAssociationMixin<PlacesInstance, number>;
  hasPlaces: HasManyHasAssociationMixin<PlacesInstance, number>;
  countPlaces: HasManyCountAssociationsMixin;
  createPlace: HasManyCreateAssociationMixin<PlacesInstance>;

  associations: {
    profiles: Association<AuthUsersInstance, ProfilesInstance>;
    roles: Association<AuthUsersInstance, AuthRolesInstance>;
    places: Association<AuthUsersInstance, PlacesInstance>;
  };
}

export default function authUsers(sequelize: Sequelize) {
  const AuthUsers = sequelize.define<AuthUsersInstance>('auth-users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    email: { type: DataTypes.TEXT, allowNull: false },
    password: { type: DataTypes.TEXT, allowNull: false },
    tenant: { type: DataTypes.UUID, allowNull: true },
    active: { type: DataTypes.BOOLEAN, allowNull: false }
  }, {
    paranoid: true,
    timestamps: true,
  });

  return AuthUsers;
}


