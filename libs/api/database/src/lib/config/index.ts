import { Dialect } from "sequelize/types";

interface IConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  DIALECT: Dialect;
}

const config: IConfig = {
  HOST: process.env.NX_POSTGRES_HOST as string,
  USER: process.env.NX_POSTGRES_USER as string,
  PASSWORD: process.env.NX_POSTGRES_PASSWORD as string,
  DB: process.env.NX_POSTGRES_DB as string,
  DIALECT: process.env.NX_POSTGRES_DIALECT as Dialect,
};

export default config
