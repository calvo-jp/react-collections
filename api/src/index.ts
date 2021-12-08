import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import router from './router';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.listen(process.env.PORT);
