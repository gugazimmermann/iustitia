import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface PaymentAttributes {
  id: string;
  transactionAmount: number;
  status: string;
  paidDate: Date;
  subscriptionId: string;
  creditcardId: string;
  userId: string;
}

export type PaymentCreationAttributes = Optional<PaymentAttributes, 'id'>

export interface PaymentInstance
  extends Model<PaymentAttributes, PaymentCreationAttributes>,
  PaymentAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
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
    transactionAmount: { type: DataTypes.DOUBLE, allowNull: false },
    status: { type: DataTypes.TEXT, allowNull: false },
    paidDate: { type: DataTypes.DATE, allowNull: false },
    subscriptionId: { type: DataTypes.UUID, allowNull: false },
    creditcardId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Payment;
}


