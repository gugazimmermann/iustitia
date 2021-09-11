import { Sequelize, DataTypes, Optional, Model } from "sequelize";
import { UserInstance } from "./user";

export interface OfficeAttributes {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  tenantId: string;
  userId: string;
}

export type OfficeCreationAttributes = Optional<OfficeAttributes, 'id' | 'phone' | 'email' | 'number' | 'complement'>

export interface OfficeInstance
  extends Model<OfficeAttributes, OfficeCreationAttributes>,
  OfficeAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  user?: UserInstance
}

export default function office(sequelize: Sequelize) {
  const Office = sequelize.define<OfficeInstance>('offices', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: DataTypes.TEXT, allowNull: false },
    phone: { type: DataTypes.TEXT, allowNull: true },
    email: { type: DataTypes.TEXT, allowNull: true },
    zip: { type: DataTypes.TEXT, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    number: { type: DataTypes.TEXT, allowNull: true },
    complement: { type: DataTypes.TEXT, allowNull: true },
    neighborhood: { type: DataTypes.TEXT, allowNull: false },
    city: { type: DataTypes.TEXT, allowNull: false },
    state: { type: DataTypes.TEXT, allowNull: false },
    tenantId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Office;
}


