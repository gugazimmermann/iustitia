import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  tenant: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'tenant'>

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
  UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
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
    tenant: { type: DataTypes.UUID, allowNull: true }
  });

  return User;
}


