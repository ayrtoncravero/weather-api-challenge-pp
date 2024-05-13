import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import weather from './routes/weather.routes';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', weather);

export default app;