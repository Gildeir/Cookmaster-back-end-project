// projeto
const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
const routes = require('./routes');
const authMiddleware = require('../middlewares/validateJWT');

const apiRoutes = express.Router();
// const app = require('./routes');

// projeto

const PORT = 3000;

// projeto
// const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiRoutes);

apiRoutes.get('/recipes', routes.getAll);
apiRoutes.get('/recipes/:id', routes.getById);
apiRoutes.post('/users', routes.createUsers);
apiRoutes.post('/login', routes.login);
apiRoutes.post('/recipes', authMiddleware.validateJWT, routes.getRecipes);
apiRoutes.put('/recipes/:id', authMiddleware.validateJWT, routes.update);
apiRoutes.delete('/recipes/:id', authMiddleware.validateJWT, routes.remove);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
