import { Sequelize, DataTypes, Optional, Model } from "sequelize";
import { UserInstance } from "./user";

export interface ProfileAttributes {
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
  userId: string;
}

export type ProfileCreationAttributes = Optional<ProfileAttributes, 'id'>

export interface ProfileInstance
  extends Model<ProfileAttributes, ProfileCreationAttributes>,
  ProfileAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserInstance
}

export default function profile(sequelize: Sequelize) {
  const Profile = sequelize.define<ProfileInstance>('profiles', {
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
    phone: { type: DataTypes.TEXT, allowNull: false },
    email: { type: DataTypes.TEXT, allowNull: false },
    zip: { type: DataTypes.TEXT, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    number: { type: DataTypes.TEXT, allowNull: true },
    complement: { type: DataTypes.TEXT, allowNull: true },
    neighborhood: { type: DataTypes.TEXT, allowNull: false },
    city: { type: DataTypes.TEXT, allowNull: false },
    state: { type: DataTypes.TEXT, allowNull: false },
    userId: { allowNull: false, type: DataTypes.UUID },
  });

  return Profile;
}


