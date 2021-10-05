import { Sequelize, DataTypes, Optional, Model } from "sequelize";
import { BCCompaniesInstance } from "./business-contacts-companies";

interface BCPersonsAttributes {
  id: string;
  avatar: string;
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
  comments: string;
  position: string;
  companyId: string;
  userId: string;
  officeId: string;
  tenantId: string;
}

type BCPersonsCreationAttributes = Optional<BCPersonsAttributes,
  'id' |
  'avatar' |
  'email' |
  'phone' |
  'zip' |
  'address' |
  'number' |
  'complement' |
  'neighborhood' |
  'city' |
  'state' |
  'comments' |
  'position' |
  'companyId' |
  'userId' |
  'officeId'
>

export interface BCPersonsInstance
  extends Model<BCPersonsAttributes, BCPersonsCreationAttributes>,
  BCPersonsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  company?: BCCompaniesInstance;
}

export default function businessContactsPersons(sequelize: Sequelize) {
  const BusinessContactsPersons = sequelize.define<BCPersonsInstance>('business-contacts-persons', {
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
    phone: { type: DataTypes.TEXT, allowNull: true },
    email: { type: DataTypes.TEXT, allowNull: true },
    zip: { type: DataTypes.TEXT, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    number: { type: DataTypes.TEXT, allowNull: true },
    complement: { type: DataTypes.TEXT, allowNull: true },
    neighborhood: { type: DataTypes.TEXT, allowNull: true },
    city: { type: DataTypes.TEXT, allowNull: true },
    state: { type: DataTypes.TEXT, allowNull: true },
    comments: { type: DataTypes.TEXT, allowNull: true },
    position: { type: DataTypes.TEXT, allowNull: true },
    companyId: { type: DataTypes.UUID, allowNull: true },
    userId: { type: DataTypes.UUID, allowNull: true },
    officeId: { type: DataTypes.UUID, allowNull: true },
    tenantId: { type: DataTypes.UUID, allowNull: true },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return BusinessContactsPersons;
}


