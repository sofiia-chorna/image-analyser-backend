import * as dotenv from 'dotenv';

// Configure reading from .env
dotenv.config();

// Retrieve environment variables
const {
  APP_PORT, APP_HOST,
  NEO4J_USER, NEO4J_PASSWORD, NEO4J_URI,
  ELASTIC_CLOUD_ID, ELASTIC_USERNAME, ELASTIC_PASSWORD,
  GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL
} = process.env;

/*
  @enum Environment variables
 */
export const ENV = {
  APP: {
    API_PATH: '/api',
    PORT: APP_PORT,
    HOST: APP_HOST,
  },
  NEO4J: {
    USER: NEO4J_USER,
    PASSWORD: NEO4J_PASSWORD,
    URI: NEO4J_URI
  },
  ELASTIC: {
    CLOUD_ID: ELASTIC_CLOUD_ID,
    USERNAME: ELASTIC_USERNAME,
    PASSWORD: ELASTIC_PASSWORD
  },
  GOOGLE: {
    CLIENT_ID: GOOGLE_CLIENT_ID,
    CLIENT_SECRET: GOOGLE_CLIENT_SECRET,
    REDIRECT_URL: GOOGLE_REDIRECT_URL
  }
};
