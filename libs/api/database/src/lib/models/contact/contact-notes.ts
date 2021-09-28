import { Sequelize, DataTypes, Optional, Model } from "sequelize";

export interface ContactNotesAttributes {
  id: string;
  title: string;
  content: string;
  ownerId: string;
}

export type ContactNotesCreationAttributes = Optional<ContactNotesAttributes, 'id'>

export interface ContactNotesInstance
  extends Model<ContactNotesAttributes, ContactNotesCreationAttributes>,
  ContactNotesAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function contactNotes(sequelize: Sequelize) {
  const ContactNotes = sequelize.define<ContactNotesInstance>('contact-notes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: false,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    title: { type: DataTypes.TEXT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    ownerId: { type: DataTypes.UUID, allowNull: false },
  });

  return ContactNotes;
}


