import { Sequelize, DataTypes, Optional, Model, HasManyAddAssociationsMixin, HasManyRemoveAssociationsMixin, HasManyGetAssociationsMixin } from "sequelize";
import { UsersInstance } from "../auth/users";

interface PlacesAttributes {
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
  active: boolean;
  tenantId: string;
}

type PlacesCreationAttributes = Optional<PlacesAttributes, 'id' | 'phone' | 'email' | 'number' | 'complement'>

export interface PlacesInstance
  extends Model<PlacesAttributes, PlacesCreationAttributes>,
  PlacesAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  managersPlace?: UsersInstance[];
  usersPlace?: UsersInstance[];

  getManagersPlace?: HasManyGetAssociationsMixin<UsersInstance>;
  addManagersPlace?: HasManyAddAssociationsMixin<UsersInstance, string>;
  removeManagersPlace?: HasManyRemoveAssociationsMixin<UsersInstance, string>;

  getUsersPlace?: HasManyGetAssociationsMixin<UsersInstance>;
  addUsersPlace?: HasManyAddAssociationsMixin<UsersInstance, string>;
  removeUsersPlace?: HasManyRemoveAssociationsMixin<UsersInstance, string>;
}

export default function places(sequelize: Sequelize) {
  const Places = sequelize.define<PlacesInstance>('places', {
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
    active: { type: DataTypes.BOOLEAN, allowNull: false },
    tenantId: { type: DataTypes.UUID, allowNull: false },
  }, {
    paranoid: true,
    timestamps: true,
  });

  return Places;
}


