import { IConfig } from "@iustitia/api/interfaces";

const config: IConfig = {
  jwtSecret: process.env.NX_JWT_SECRET,
  // jwtExpiration: 60,
  // jwtRefreshExpiration: 120,
  jwtExpiration: (1 * 60 * 60),
  jwtRefreshExpiration: (24 * 60 * 60),
};

export default config;
