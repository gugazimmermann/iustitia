import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface ForgotPasswordAttributes {
  id: number;
  email: string;
  code: number;
  codeurl: string;
  expiryDate: Date;
}

export type ForgotPasswordCreationAttributes = Optional<ForgotPasswordAttributes, 'id'>

export interface ForgotPasswordInstance
  extends Model<ForgotPasswordAttributes, ForgotPasswordCreationAttributes>,
  ForgotPasswordAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export default function forgotPassword(sequelize: Sequelize) {
  const ForgotPassword = sequelize.define<ForgotPasswordInstance>("forgot-password", {
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

  return ForgotPassword;
}
