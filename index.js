const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

const whiteList = [
  'http://localhost:8080',
];
const corsOptions = {
  origin(origin, cb) {
    if(whiteList.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('origin not allowed'));
    }
  }
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Hola bb!');
});

