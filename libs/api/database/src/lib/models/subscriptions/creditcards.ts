import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface CreditcardsAttributes {
  id: string;
  name: string;
  firstSixDigits: string;
  lastFourDigits: string;
  expirationMonth: string;
  expirationYear: string;
  status: boolean;
  userId: string;
}

export type CreditcardsCreationAttributes = Optional<CreditcardsAttributes, 'id'>

export interface CreditcardsInstance
  extends Model<CreditcardsAttributes, CreditcardsCreationAttributes>,
  CreditcardsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function creditcards(sequelize: Sequelize) {
  const Creditcards = sequelize.define<CreditcardsInstance>('creditcards', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: DataTypes.TEXT, allowNull: false },
    firstSixDigits: { type: DataTypes.TEXT, allowNull: false },
    lastFourDigits: { type: DataTypes.TEXT, allowNull: false },
    expirationMonth: { type: DataTypes.TEXT, allowNull: false },
    expirationYear: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Creditcards;
}


