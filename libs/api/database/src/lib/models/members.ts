import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface MembersAttributes {
  id: string;
  name: string;
  email: string;
  code: string;
  userId: string;
  tenantId: string;
}

export type MembersCreationAttributes = Optional<MembersAttributes, 'id'>

export interface MembersInstance
  extends Model<MembersAttributes, MembersCreationAttributes>,
  MembersAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export default function members(sequelize: Sequelize) {
  const Members = sequelize.define<MembersInstance>("members", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    code: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    tenantId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  });

  return Members;
}
