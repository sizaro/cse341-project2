const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {title: 'My Web Api',
    description: 'Courses Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index'];

//this generates swagger.json

swaggerAutogen(outputFile, endpointsFiles, doc);

