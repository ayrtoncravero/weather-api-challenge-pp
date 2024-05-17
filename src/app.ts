import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import weather from './routes/weather.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './doc/swagger';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/v1', weather);

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;