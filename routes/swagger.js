const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const Authenticated = require('../middle-ware/index')
router.use('/api-docs', Authenticated.Authenticated, swaggerUi.serve);
router.get('/api-docs', Authenticated.Authenticated, swaggerUi.setup(swaggerDocument));

module.exports = router