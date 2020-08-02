require("dotenv").config();

const config = {
  database: {
    url: process.env.MONGO_URL,
  },
  app: {
    port: process.env.APP_PORT,
  },
  encryption: {
    iv: process.env.ENCRYPTION_IV,
    key: process.env.ENCRYPTION_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiries: parseInt(process.env.JWT_EXP_TIME, 10),
  },
};

export default config;
