import { Sequelize, DataTypes, Optional, Model } from "sequelize";
import { UserInstance } from "./user";

export interface SubscriptionAttributes {
  id: string;
  userId: string;
  planId: string;
  reason: string;
  frequency: number;
  frequencyType: string;
  transactionAmount: number;
  status: boolean;
}

export type SubscriptionCreationAttributes = Optional<SubscriptionAttributes, 'id'>

export interface SubscriptionInstance
  extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>,
  SubscriptionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserInstance
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
    userId: { type: DataTypes.UUID, allowNull: false },
    planId: { type: DataTypes.UUID, allowNull: false },
    reason: { type: DataTypes.TEXT, allowNull: false },
    frequency: { type: DataTypes.INTEGER, allowNull: false },
    frequencyType: { type: DataTypes.TEXT, allowNull: false },
    transactionAmount: { type: DataTypes.DOUBLE, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Subscription;
}


