module.exports = {
  host: process.env.NX_POSTGRES_HOST,
  username: process.env.NX_POSTGRES_USER,
  password: process.env.NX_POSTGRES_PASSWORD,
  database: process.env.NX_POSTGRES_DB,
  dialect: process.env.NX_POSTGRES_DIALECT,
}
