const config = {
  HOST: process.env.NX_POSTGRES_HOST,
  USER: process.env.NX_POSTGRES_USER,
  PASSWORD: process.env.NX_POSTGRES_PASSWORD,
  DB: process.env.NX_POSTGRES_DB,
  dialect: 'postgres',
}

export default config
