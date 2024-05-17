import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import weatherRoutes from './routes/weather.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './doc/swagger';
import responseTime from 'response-time';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(responseTime());

app.use('/v1', weatherRoutes);

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;