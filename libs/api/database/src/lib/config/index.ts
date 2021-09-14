import { Dialect } from "sequelize/types";

interface IConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  DIALECT: Dialect;
}

const config: IConfig = {
  HOST: process.env.NX_POSTGRES_HOST,
  USER: process.env.NX_POSTGRES_USER,
  PASSWORD: process.env.NX_POSTGRES_PASSWORD,
  DB: process.env.NX_POSTGRES_DB,
  DIALECT: process.env.NX_POSTGRES_DIALECT as Dialect,
};

export default config
