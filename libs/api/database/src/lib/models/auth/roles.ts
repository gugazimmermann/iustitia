import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface RolesAttributes {
  id: string;
  name: string;
}

type RolesCreationAttributes = Optional<RolesAttributes, 'id'>

export interface RolesInstance
  extends Model<RolesAttributes, RolesCreationAttributes>,
  RolesAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export default function roles(sequelize: Sequelize) {
  const Roles = sequelize.define<RolesInstance>('roles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: DataTypes.TEXT, allowNull: false },
  });

  return Roles;
}


