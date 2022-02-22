const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');

const UserController = require('./controllers/UserController');

const validateUser = require('./controllers/middlewares/validateUser');
const validateLogin = require('./controllers/middlewares/validateLogin');
const loginController = require('./controllers/LoginController');
const validateToken = require('./controllers/middlewares/validateToken');
const validateCateg = require('./controllers/middlewares/ValidateCateg');
const Categories = require('./controllers/Categories');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Requisito 1 - - Sua aplicação deve ter o endpoint POST /user
app.post('/user',
  validateUser.validateName,
  validateUser.validateEmail,
  validateUser.validatePassword,
  UserController.add);

  // Requisito 2 - Sua aplicação deve ter o endpoint POST /login
app.post('/login',
validateLogin.validateEmail,
validateLogin.validatePassword,
validateLogin.validateLogin,
loginController);

// Requisito 3 - Sua aplicação deve ter o endpoint GET /user
app.get('/user',
validateToken, UserController.getAll);

// Requisito 4 - Sua aplicação deve ter o endpoint GET /user/:id
app.get('/user/:id',
validateToken, UserController.getById);

// // Requisito 5 - Sua aplicação deve ter o endpoint POST /categories
app.post('/categories',
validateToken,
validateCateg, Categories.add);


