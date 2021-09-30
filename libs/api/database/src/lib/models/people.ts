import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface PeopleAttributes {
  id: string;
  name: string;
  email: string;
  code: string;
  userId: string;
  tenantId: string;
}

export type PeopleCreationAttributes = Optional<PeopleAttributes, 'id'>

export interface PeopleInstance
  extends Model<PeopleAttributes, PeopleCreationAttributes>,
  PeopleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export default function people(sequelize: Sequelize) {
  const People = sequelize.define<PeopleInstance>("peoples", {
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

  return People;
}
