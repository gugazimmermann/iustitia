import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface SubscriptionsCreditcardsAttributes {
  id: string;
  name: string;
  firstSixDigits: string;
  lastFourDigits: string;
  expirationMonth: string;
  expirationYear: string;
  status: boolean;
  userId: string;
}

type SubscriptionsCreditcardsCreationAttributes = Optional<SubscriptionsCreditcardsAttributes, 'id'>

export interface SubscriptionsCreditcardsInstance
  extends Model<SubscriptionsCreditcardsAttributes, SubscriptionsCreditcardsCreationAttributes>,
  SubscriptionsCreditcardsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function subscriptionsCreditcards(sequelize: Sequelize) {
  const SubscriptionsCreditcards = sequelize.define<SubscriptionsCreditcardsInstance>('subscriptions-creditcards', {
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

  return SubscriptionsCreditcards;
}


