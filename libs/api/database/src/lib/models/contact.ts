import { Sequelize, DataTypes, Optional, Model } from "sequelize";
import { UserInstance } from "./user";

export interface ContactAttributes {
  id: string;
  avatar: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  zip: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  description: string;
  tenantId: string;
  userId: string;
}

export type ContactCreationAttributes = Optional<ContactAttributes,
  'id' |
  'avatar' |
  'company' |
  'position' |
  'email' |
  'phone' |
  'zip' |
  'address' |
  'number' |
  'complement' |
  'neighborhood' |
  'city' |
  'state' |
  'description'
>

export interface ContactInstance
  extends Model<ContactAttributes, ContactCreationAttributes>,
  ContactAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  user?: UserInstance
}

export default function contact(sequelize: Sequelize) {
  const Contact = sequelize.define<ContactInstance>('contacts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    avatar: { type: DataTypes.TEXT, allowNull: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    company: { type: DataTypes.TEXT, allowNull: true },
    position: { type: DataTypes.TEXT, allowNull: true },
    phone: { type: DataTypes.TEXT, allowNull: true },
    email: { type: DataTypes.TEXT, allowNull: true },
    zip: { type: DataTypes.TEXT, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    number: { type: DataTypes.TEXT, allowNull: true },
    complement: { type: DataTypes.TEXT, allowNull: true },
    neighborhood: { type: DataTypes.TEXT, allowNull: true },
    city: { type: DataTypes.TEXT, allowNull: true },
    state: { type: DataTypes.TEXT, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    tenantId: { type: DataTypes.UUID, allowNull: true },
    userId: { type: DataTypes.UUID, allowNull: false },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Contact;
}


