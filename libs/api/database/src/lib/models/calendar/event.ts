import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface EventAttributes {
  id: string;
  startDate: Date;
  endDate: Date;
  fullDay: boolean;
  color: string;
  title: string;
  description: string;
  userId: string;
  officeId: string;
  tenantId: string;
}

export type EventCreationAttributes = Optional<EventAttributes,
  'id' |
  'description' |
  'userId' |
  'officeId'
>

export interface EventInstance
  extends Model<EventAttributes, EventCreationAttributes>,
  EventAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function event(sequelize: Sequelize) {
  const Event = sequelize.define<EventInstance>('events', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: true },
    fullDay: { type: DataTypes.BOOLEAN, allowNull: true },
    color: { type: DataTypes.TEXT, allowNull: true },
    title: { type: DataTypes.TEXT, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    userId: { type: DataTypes.UUID, allowNull: true },
    officeId: { type: DataTypes.UUID, allowNull: true },
    tenantId: { type: DataTypes.UUID, allowNull: true },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Event;
}
