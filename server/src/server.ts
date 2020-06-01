import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

/** Keep It Simple & Stupid */

app.listen(3333, () => {
  console.log('Server running in port 3333!');
});
