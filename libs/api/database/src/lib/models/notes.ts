import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface NotesAttributes {
  id: string;
  title: string;
  content: string;
  ownerId: string;
}

type NotesCreationAttributes = Optional<NotesAttributes, 'id'>

export interface NotesInstance
  extends Model<NotesAttributes, NotesCreationAttributes>,
  NotesAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default function notes(sequelize: Sequelize) {
  const Notes = sequelize.define<NotesInstance>('notes', {
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

  return Notes;
}


