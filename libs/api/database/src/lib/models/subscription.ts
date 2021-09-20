import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface SubscriptionAttributes {
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

export type SubscriptionCreationAttributes = Optional<SubscriptionAttributes, 'id'>

export interface SubscriptionInstance
  extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>,
  SubscriptionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function subscription(sequelize: Sequelize) {
  const Subscription = sequelize.define<SubscriptionInstance>('subscriptions', {
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

  return Subscription;
}


