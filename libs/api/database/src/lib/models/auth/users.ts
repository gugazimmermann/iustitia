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
import { RolesInstance } from "./roles";
import { ProfilesInstance } from "../profiles/profiles";
import { SubscriptionsInstance } from "../subscriptions/subscriptions";
import { PlacesInstance } from "../places/places";

interface UsersAttributes {
  id: string;
  email: string;
  password: string;
  tenant: string;
  active: boolean;
}

type UsersCreationAttributes = Optional<UsersAttributes, 'id' | 'tenant'>

export interface UsersInstance
  extends Model<UsersAttributes, UsersCreationAttributes>,
  UsersAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roles?: RolesInstance[];
  profile?: ProfilesInstance;
  subscription?: SubscriptionsInstance;
  places?: PlacesInstance[];

  getRoles?: HasManyGetAssociationsMixin<RolesInstance>;
  addRole?: HasManyAddAssociationMixin<RolesInstance, number>;
  hasRole?: HasManyHasAssociationMixin<RolesInstance, number>;
  countRoles?: HasManyCountAssociationsMixin;
  createRole?: HasManyCreateAssociationMixin<RolesInstance>;

  getPlaces?: HasManyGetAssociationsMixin<PlacesInstance>;
  addPlace?: HasManyAddAssociationMixin<PlacesInstance, number>;
  hasPlaces?: HasManyHasAssociationMixin<PlacesInstance, number>;
  countPlaces?: HasManyCountAssociationsMixin;
  createPlace?: HasManyCreateAssociationMixin<PlacesInstance>;

  associations: {
    profiles: Association<UsersInstance, ProfilesInstance>;
    roles: Association<UsersInstance, RolesInstance>;
    places: Association<UsersInstance, PlacesInstance>;
  };
}

export default function users(sequelize: Sequelize) {
  const Users = sequelize.define<UsersInstance>('users', {
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

  return Users;
}


