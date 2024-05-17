import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
const PORT: number | string = process.env.PORT || 3000;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'challenge-backend-pp',
        version: '1.0.0',
        description: 'API que permite obtener la ubicación y clima de tu zona',
        contact: {
            name: 'Ayrton Cravero',
            email: 'ayrtoncravero26@gmail.com',
            url: 'https://github.com/ayrtoncravero'
        },
    },
    servers: [
        {
          url: `http://localhost:${PORT}/v1`,
          description: 'Local server'
        },
    ]
};

const options = {
    swaggerDefinition,
    apis: [`${path.join(__dirname, '../routes/*')}`],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
