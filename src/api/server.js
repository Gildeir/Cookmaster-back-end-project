// projeto
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
// const path = require('path');
const fs = require('fs');
const app = require('./app');
const routes = require('./routes');
const authMiddleware = require('../middlewares/validateJWT');

const apiRoutes = express.Router();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiRoutes);

// sending files

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => callback(null, 'uploads/'),
//   filename: (req, file, callback) => callback(null, file.originalname),
// });

const storage = multer.diskStorage({
  destination: async (_req, _file, callback) => {
        const folderName = './src/uploads';
        fs.mkdirSync(folderName, { recursive: true });
        callback(null, folderName); 
},
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.${file.mimetype.split('/')[1]}`);
} });

const upload = multer({ storage });

/* const upload = multer({ dest: 'uploads/' });

// app.user('/arquivos', express.static(`${__dirname}/uploads`));
path.join('upload', 'arquivo');
app.use('/arquivos', express.static(path.resolve('upload')));

app.post('/files', upload.single('file'), (req, res) => res.status(201)
  .json({ message: 'Arquivo' })); */

  apiRoutes.get('/recipes', routes.getAll);
  apiRoutes.get('/recipes/:id', routes.getById);
  apiRoutes.post('/users', routes.createUsers);
  apiRoutes.post('/login', routes.login);
  apiRoutes.post('/recipes', authMiddleware.validateJWT, routes.getRecipes);
  apiRoutes.put('/recipes/:id', authMiddleware.validateJWT, routes.update);
  apiRoutes.delete('/recipes/:id', authMiddleware.validateJWT, routes.remove);
  app.put('/recipes/:id/image', authMiddleware.validateJWT, upload
    .single('image'), routes.addingImage);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
