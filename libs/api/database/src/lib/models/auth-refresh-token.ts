import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface AuthRefreshTokenAttributes {
  id: number;
  token: string;
  expiryDate: Date;
  userId: string;
}

type AuthRefreshTokenCreationAttributes = Optional<AuthRefreshTokenAttributes, 'id'>

export interface AuthRefreshTokenInstance
  extends Model<AuthRefreshTokenAttributes, AuthRefreshTokenCreationAttributes>,
  AuthRefreshTokenAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export default function authRefreshToken(sequelize: Sequelize) {
  const AuthRefreshToken = sequelize.define<AuthRefreshTokenInstance>("auth-refresh-token", {
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

  return AuthRefreshToken;
}
