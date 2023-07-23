const { PORT = 3000 } = process.env;
const { NODE_ENV = 'dev' } = process.env;
const { JWT_SECRET } = process.env;
const { DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DB_URL,
};
