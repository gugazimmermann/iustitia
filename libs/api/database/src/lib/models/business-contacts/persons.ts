import { Sequelize, DataTypes, Optional, Model, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin, HasManyRemoveAssociationsMixin } from "sequelize";
import { CompaniesInstance } from "./companies";
import { UsersInstance } from "../auth/users";
import { PlacesInstance } from "../places/places";

interface PersonsAttributes {
  id: string;
  type: string;
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
  tenantId: string;
}

type PersonsCreationAttributes = Optional<PersonsAttributes,
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
  'companyId'
>

export interface PersonsInstance
  extends Model<PersonsAttributes, PersonsCreationAttributes>,
  PersonsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  company?: CompaniesInstance;
  userClients?: UsersInstance[];
  userSupliers?: UsersInstance[];
  userContacts?: UsersInstance[];
  placeClients?: PlacesInstance[];
  placeSupliers?: PlacesInstance[];
  placeContacts?: PlacesInstance[];

  getUserClients?: HasManyGetAssociationsMixin<UsersInstance>;
  addUserClients?: HasManyAddAssociationsMixin<UsersInstance, string>;
  removeUserClients?: HasManyRemoveAssociationsMixin<UsersInstance, string>;

  getUserSupliers?: HasManyGetAssociationsMixin<UsersInstance>;
  addUserSupliers?: HasManyAddAssociationsMixin<UsersInstance, string>;
  removeUserSupliers?: HasManyRemoveAssociationsMixin<UsersInstance, string>;

  getUserContacts?: HasManyGetAssociationsMixin<UsersInstance>;
  addUserContacts?: HasManyAddAssociationsMixin<UsersInstance, string>;
  removeUserContacts?: HasManyRemoveAssociationsMixin<UsersInstance, string>;

  getPlaceClients?: HasManyGetAssociationsMixin<PlacesInstance>;
  addPlaceClients?: HasManyAddAssociationsMixin<PlacesInstance, string>;
  removePlaceClients?: HasManyRemoveAssociationsMixin<PlacesInstance, string>;

  getPlaceSupliers?: HasManyGetAssociationsMixin<PlacesInstance>;
  addPlaceSupliers?: HasManyAddAssociationsMixin<PlacesInstance, string>;
  removePlaceSupliers?: HasManyRemoveAssociationsMixin<PlacesInstance, string>;

  getPlaceContacts?: HasManyGetAssociationsMixin<PlacesInstance>;
  addPlaceContacts?: HasManyAddAssociationsMixin<PlacesInstance, string>;
  removePlaceContacts?: HasManyRemoveAssociationsMixin<PlacesInstance, string>;
}

export default function persons(sequelize: Sequelize) {
  const Persons = sequelize.define<PersonsInstance>('persons', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    type: { type: DataTypes.TEXT, allowNull: true },
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
    tenantId: { type: DataTypes.UUID, allowNull: true },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Persons;
}


