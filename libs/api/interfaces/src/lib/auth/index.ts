export interface IConfig {
  jwtSecret: string;
  jwtExpiration: number;
  jwtRefreshExpiration: number;
}
