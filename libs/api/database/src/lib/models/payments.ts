import { Sequelize, DataTypes, Optional, Model } from "sequelize";
import { UserInstance } from "./user";

export interface PaymentAttributes {
  id: string;
  userId: string;
  transactionAmount: number;
  status: string;
  paidDate: Date;
}

export type PaymentCreationAttributes = Optional<PaymentAttributes, 'id'>

export interface PaymentInstance
  extends Model<PaymentAttributes, PaymentCreationAttributes>,
  PaymentAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserInstance
}

export default function payment(sequelize: Sequelize) {
  const Payment = sequelize.define<PaymentInstance>('payments', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    userId: { type: DataTypes.UUID, allowNull: false },
    transactionAmount: { type: DataTypes.DOUBLE, allowNull: false },
    status: { type: DataTypes.TEXT, allowNull: false },
    paidDate: { type: DataTypes.DATE, allowNull: false },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Payment;
}


