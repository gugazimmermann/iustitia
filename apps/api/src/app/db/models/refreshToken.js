import { Sequelize, DataTypes } from "sequelize";
import { authConfig } from "../../config";
import { v4 as uuidv4 } from 'uuid';

export default function refreshToken(sequelize) {
  const RefreshToken = sequelize.define("refreshToken", {
    token: { type: DataTypes.UUID,},
    expiryDate: { type: Sequelize.DATE },
  });

  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + authConfig.jwtRefreshExpiration);
    let _token = uuidv4();
    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    });
    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  return RefreshToken;
};
