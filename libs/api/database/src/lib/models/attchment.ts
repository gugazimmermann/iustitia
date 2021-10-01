import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface AttachmentsAttributes {
  id: string;
  name: string;
  link: string;
  ownerId: string;
}

export type AttachmentsCreationAttributes = Optional<AttachmentsAttributes, 'id'>

export interface AttachmentsInstance
  extends Model<AttachmentsAttributes, AttachmentsCreationAttributes>,
  AttachmentsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function attachments(sequelize: Sequelize) {
  const Attachments = sequelize.define<AttachmentsInstance>('attachments', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: DataTypes.TEXT, allowNull: false },
    link: { type: DataTypes.TEXT, allowNull: false },
    ownerId: { type: DataTypes.UUID, allowNull: false },
  });

  return Attachments;
}
