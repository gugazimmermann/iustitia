import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface ContactAttachmentsAttributes {
  id: string;
  name: string;
  link: string;
}

export type ContactAttachmentsCreationAttributes = Optional<ContactAttachmentsAttributes, 'id'>

export interface ContactAttachmentsInstance
  extends Model<ContactAttachmentsAttributes, ContactAttachmentsCreationAttributes>,
  ContactAttachmentsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function contactAttachments(sequelize: Sequelize) {
  const ContactAttachments = sequelize.define<ContactAttachmentsInstance>('contactAttachments', {
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
  });

  return ContactAttachments;
}


