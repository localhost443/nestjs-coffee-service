export const appConfig = () => ({
  environment: process.env.ENV || 'test',
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
});
