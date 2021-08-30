export const dbConfig = {
  HOST: process.env.NX_POSTGRES_HOST,
  USER: process.env.NX_POSTGRES_USER,
  PASSWORD: process.env.NX_POSTGRES_PASSWORD,
  DB: process.env.NX_POSTGRES_DB,
  dialect: "postgres",
};

export const authConfig = {
  secret: process.env.NX_JWT_SECRET,
  // jwtExpiration: (1 * 60 * 60),
  // jwtRefreshExpiration: (24 * 60 * 60),
  jwtExpiration: 60,
  jwtRefreshExpiration: 120,
};
