import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface PaymentsAttributes {
  id: string;
  transactionAmount: number;
  status: string;
  paidDate: Date;
  subscriptionId: string;
  creditcardId: string;
  userId: string;
}

type PaymentsCreationAttributes = Optional<PaymentsAttributes, 'id'>

export interface PaymentsInstance
  extends Model<PaymentsAttributes, PaymentsCreationAttributes>,
  PaymentsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function payments(sequelize: Sequelize) {
  const Payments = sequelize.define<PaymentsInstance>('payments', {
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

  return Payments;
}


