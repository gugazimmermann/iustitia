import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface SubscriptionsAttributes {
  id: string;
  reason: string;
  frequency: number;
  frequencyType: string;
  transactionAmount: number;
  status: boolean;
  type: string;
  planId: string;
  userId: string;
}

export type SubscriptionsCreationAttributes = Optional<SubscriptionsAttributes, 'id'>

export interface SubscriptionsInstance
  extends Model<SubscriptionsAttributes, SubscriptionsCreationAttributes>,
  SubscriptionsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function subscriptions(sequelize: Sequelize) {
  const Subscriptions = sequelize.define<SubscriptionsInstance>('subscriptions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    reason: { type: DataTypes.TEXT, allowNull: false },
    frequency: { type: DataTypes.INTEGER, allowNull: false },
    frequencyType: { type: DataTypes.TEXT, allowNull: false },
    transactionAmount: { type: DataTypes.DOUBLE, allowNull: false },
    type: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
    planId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Subscriptions;
}


