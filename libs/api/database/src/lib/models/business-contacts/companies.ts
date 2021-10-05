import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface CompaniesAttributes {
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

type CompaniesCreationAttributes = Optional<CompaniesAttributes,
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

export interface CompaniesInstance
  extends Model<CompaniesAttributes, CompaniesCreationAttributes>,
  CompaniesAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  contacts: {
    id: string;
    name: string;
    position: string;
  }[];
}

export default function companies(sequelize: Sequelize) {
  const Companies = sequelize.define<CompaniesInstance>('companies', {
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

  return Companies;
}
