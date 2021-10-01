import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface AuthRolesAttributes {
  id: string;
  name: string;
}

type AuthRolesCreationAttributes = Optional<AuthRolesAttributes, 'id'>

export interface AuthRolesInstance
  extends Model<AuthRolesAttributes, AuthRolesCreationAttributes>,
  AuthRolesAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function authRoles(sequelize: Sequelize) {
  const AuthRoles = sequelize.define<AuthRolesInstance>('auth-roles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: DataTypes.TEXT, allowNull: false },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return AuthRoles;
}


