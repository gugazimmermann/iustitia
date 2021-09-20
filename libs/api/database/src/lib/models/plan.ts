import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface PlanAttributes {
  id: string;
  preapprovalPlanId: string;
  collectorId: number;
  applicationId: number;
  reason: string;
  status: string;
  initPoint: string;
  frequency: number;
  frequencyType: string;
  transactionAmount: number;
  currencyId: string;
  type: string;
}

export type PlanCreationAttributes = Optional<PlanAttributes, 'id'>

export interface PlansInstance
  extends Model<PlanAttributes, PlanCreationAttributes>,
  PlanAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function plan(sequelize: Sequelize) {
  const Plans = sequelize.define<PlansInstance>('plans', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    preapprovalPlanId: { type: DataTypes.TEXT, allowNull: false },
    collectorId: { type: DataTypes.BIGINT, allowNull: false },
    applicationId: { type: DataTypes.BIGINT, allowNull: false },
    reason: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.TEXT, allowNull: false },
    initPoint: { type: DataTypes.TEXT, allowNull: false },
    frequency: { type: DataTypes.INTEGER, allowNull: false },
    frequencyType: { type: DataTypes.TEXT, allowNull: false },
    transactionAmount: { type: DataTypes.DOUBLE, allowNull: false },
    currencyId: { type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.TEXT, allowNull: false },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Plans;
}


