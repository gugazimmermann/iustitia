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
import { RoleInstance } from "./role";
import { ProfileInstance } from "./profile";
import { SubscriptionInstance } from "./subscription";
import { OfficeInstance } from "./office";

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  tenant: string;
  active: boolean;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'tenant'>

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
  UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roles?: RoleInstance[];
  profile?: ProfileInstance;
  subscription?: SubscriptionInstance;
  offices?: OfficeInstance[];

  getRoles?: HasManyGetAssociationsMixin<RoleInstance>;
  addRole?: HasManyAddAssociationMixin<RoleInstance, number>;
  hasRole?: HasManyHasAssociationMixin<RoleInstance, number>;
  countRoles?: HasManyCountAssociationsMixin;
  createRole?: HasManyCreateAssociationMixin<RoleInstance>;

  getOffices?: HasManyGetAssociationsMixin<OfficeInstance>;
  addOffice?: HasManyAddAssociationMixin<OfficeInstance, number>;
  hasOffice?: HasManyHasAssociationMixin<OfficeInstance, number>;
  countOffices?: HasManyCountAssociationsMixin;
  createOffice?: HasManyCreateAssociationMixin<OfficeInstance>;

  associations: {
    profile: Association<UserInstance, ProfileInstance>;
    roles: Association<UserInstance, RoleInstance>;
    offices: Association<UserInstance, OfficeInstance>;
  };
}

export default function user(sequelize: Sequelize) {
  const User = sequelize.define<UserInstance>('users', {
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

  return User;
}


