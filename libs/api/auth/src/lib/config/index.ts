export interface IConfig {
  jwtSecret: string;
  jwtExpiration: number;
  jwtRefreshExpiration: number;
}

const config: IConfig = {
  jwtSecret: process.env.NX_JWT_SECRET as string,
  // jwtExpiration: 60,
  // jwtRefreshExpiration: 120,
  jwtExpiration: (1 * 60 * 60),
  jwtRefreshExpiration: (24 * 60 * 60),
};

export default config;
