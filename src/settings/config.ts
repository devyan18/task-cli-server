export const config = () => ({
  PORT: +process.env.PORT || 3000,
  JWT_SECRET: process.env.SECRET || 'JWT_SECRET',
  MONGODB_URI: process.env.MONGODB_URI,
});
