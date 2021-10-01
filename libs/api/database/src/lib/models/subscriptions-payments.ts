import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface SubscriptionsPaymentsAttributes {
  id: string;
  transactionAmount: number;
  status: string;
  paidDate: Date;
  subscriptionId: string;
  creditcardId: string;
  userId: string;
}

type SubscriptionsPaymentsCreationAttributes = Optional<SubscriptionsPaymentsAttributes, 'id'>

export interface SubscriptionsPaymentsInstance
  extends Model<SubscriptionsPaymentsAttributes, SubscriptionsPaymentsCreationAttributes>,
  SubscriptionsPaymentsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function subscriptionsPayments(sequelize: Sequelize) {
  const SubscriptionsPayments = sequelize.define<SubscriptionsPaymentsInstance>('subscriptions-payments', {
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

  return SubscriptionsPayments;
}


