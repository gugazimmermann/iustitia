import { Sequelize, DataTypes } from "sequelize";

const ID = {
  type: DataTypes.UUID,
  defaultValue: Sequelize.UUIDV4,
  allowNull: false,
  unique: true,
  primaryKey: true,
};

export default function userModel(sequelize) {
  const User = sequelize.define("users", {
    id: ID,
    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    tenant: { type: DataTypes.UUID },
  });

  return User;
}
