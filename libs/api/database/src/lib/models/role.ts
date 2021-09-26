import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface RoleAttributes {
  id: string;
  name: string;
}

export type RoleCreationAttributes = Optional<RoleAttributes, 'id'>

export interface RoleInstance
  extends Model<RoleAttributes, RoleCreationAttributes>,
  RoleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function role(sequelize: Sequelize) {
  const Role = sequelize.define<RoleInstance>('roles', {
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

  return Role;
}


