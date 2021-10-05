import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface EventsAttributes {
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

type EventsCreationAttributes = Optional<EventsAttributes,
  'id' |
  'description' |
  'userId' |
  'officeId'
>

export interface EventsInstance
  extends Model<EventsAttributes, EventsCreationAttributes>,
  EventsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function events(sequelize: Sequelize) {
  const Events = sequelize.define<EventsInstance>('events', {
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

  return Events;
}
