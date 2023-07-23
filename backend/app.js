require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signup, signin } = require('./middlewares/validation');
const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_URL } = require('./config');

const app = express();
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов, пожалуйста, повторите попытку позже',
});

app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', signin, login);
app.post('/signup', signup, createUser);
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

async function connect() {
  await mongoose.connect(DB_URL, {});
  await app.listen(PORT);
}

connect();
