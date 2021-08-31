interface IConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
}

const config: IConfig = {
  HOST: process.env.NX_POSTGRES_HOST,
  USER: process.env.NX_POSTGRES_USER,
  PASSWORD: process.env.NX_POSTGRES_PASSWORD,
  DB: process.env.NX_POSTGRES_DB
};

export default config
