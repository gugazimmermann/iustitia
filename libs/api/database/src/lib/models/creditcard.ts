import { Sequelize, DataTypes, Optional, Model } from "sequelize";
import { UserInstance } from "./user";

export interface CreditcardAttributes {
  id: string;
  userId: string;
  name: string;
  lastFourDigits: number;
  expirationMonth: number;
  expirationYear: number;
}

export type CreditcardCreationAttributes = Optional<CreditcardAttributes, 'id'>

export interface CreditcardInstance
  extends Model<CreditcardAttributes, CreditcardCreationAttributes>,
  CreditcardAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserInstance
}

export default function creditcard(sequelize: Sequelize) {
  const Creditcard = sequelize.define<CreditcardInstance>('creditcards', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    userId: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.TEXT, allowNull: false },
    lastFourDigits: { type: DataTypes.INTEGER, allowNull: false },
    expirationMonth: { type: DataTypes.INTEGER, allowNull: false },
    expirationYear: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Creditcard;
}


