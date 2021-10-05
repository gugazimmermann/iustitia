import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface BCCompaniesAttributes {
  id: string;
  name: string;
  site: string;
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
  tenantId: string;
}

type BCCompaniesCreationAttributes = Optional<BCCompaniesAttributes,
  'id' |
  'site' |
  'email' |
  'phone' |
  'zip' |
  'address' |
  'number' |
  'complement' |
  'neighborhood' |
  'city' |
  'state' |
  'comments'
>

export interface BCCompaniesInstance
  extends Model<BCCompaniesAttributes, BCCompaniesCreationAttributes>,
  BCCompaniesAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  contacts: {
    id: string;
    name: string;
    position: string;
  }[];
}

export default function businessContactsCompanies(sequelize: Sequelize) {
  const BusinessContactsCompanies = sequelize.define<BCCompaniesInstance>('business-contacts-companies', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: DataTypes.TEXT, allowNull: false },
    site: { type: DataTypes.TEXT, allowNull: true },
    email: { type: DataTypes.TEXT, allowNull: true },
    phone: { type: DataTypes.TEXT, allowNull: true },
    zip: { type: DataTypes.TEXT, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    number: { type: DataTypes.TEXT, allowNull: true },
    complement: { type: DataTypes.TEXT, allowNull: true },
    neighborhood: { type: DataTypes.TEXT, allowNull: true },
    city: { type: DataTypes.TEXT, allowNull: true },
    state: { type: DataTypes.TEXT, allowNull: true },
    comments: { type: DataTypes.TEXT, allowNull: true },
    tenantId: { type: DataTypes.UUID, allowNull: true },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return BusinessContactsCompanies;
}
