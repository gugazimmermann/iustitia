import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface RefreshTokenAttributes {
  id: number;
  token: string;
  expiryDate: Date;
  userId: string;
}

export type RefreshTokenCreationAttributes = Optional<RefreshTokenAttributes, 'id'>

export interface RefreshTokenInstance
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>,
  RefreshTokenAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export default function refreshToken(sequelize: Sequelize) {
  const RefreshToken = sequelize.define<RefreshTokenInstance>("refreshToken", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    token: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    expiryDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  });

  return RefreshToken;
}
