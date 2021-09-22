// projeto

const express = require('express');
const bodyParser = require('body-parser');
// const createUsersController = require('../controllers/createUser');
const routes = require('./routes');

const apiRoutes = express.Router();
// const app = require('./routes');

// projeto

const PORT = 3000;
// const PORT = process.env.PORT || 8080;

// projeto
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiRoutes);

// apiRoutes.get('/api/posts', routes.getPosts);
apiRoutes.get('/users', routes.getAll);
apiRoutes.post('/users', routes.createUsers);
apiRoutes.post('/login', routes.login);

app.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));
