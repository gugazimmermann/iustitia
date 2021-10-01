import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface AuthForgotPasswordAttributes {
  id: number;
  email: string;
  code: number;
  codeurl: string;
  expiryDate: Date;
}

type AuthForgotPasswordCreationAttributes = Optional<AuthForgotPasswordAttributes, 'id'>

export interface AuthForgotPasswordInstance
  extends Model<AuthForgotPasswordAttributes, AuthForgotPasswordCreationAttributes>,
  AuthForgotPasswordAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export default function authForgotPassword(sequelize: Sequelize) {
  const AuthForgotPassword = sequelize.define<AuthForgotPasswordInstance>("auth-forgot-password", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    code: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    codeurl: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    expiryDate: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  });

  return AuthForgotPassword;
}
