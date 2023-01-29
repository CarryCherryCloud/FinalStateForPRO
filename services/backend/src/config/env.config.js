const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.API_PORT || 9000;
const ORIGIN = process.env.ORIGIN || `["http://localhost:3000"]`;
const SESSION_SECRET = process.env.SESSION_SECRET || "itssecret";
const ENGINE_URL = process.env.ENGINE_URL || "http://localhost:9000";

module.exports = {
  PORT,
  ORIGIN,
  SESSION_SECRET,
  NODE_ENV,
  ENGINE_URL,
};
