const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');

const UserController = require('./controllers/UserController');
const Categories = require('./controllers/Categories');
const LoginController = require('./controllers/LoginController');
const PostController = require('./controllers/PostController');

const validateUser = require('./controllers/middlewares/validateUser');
const validateLogin = require('./controllers/middlewares/validateLogin');
const validateToken = require('./controllers/middlewares/validateToken');
const validateCateg = require('./controllers/middlewares/ValidateCateg');
const validatePost = require('./controllers/middlewares/validatePost');

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
LoginController);

// Requisito 3 - Sua aplicação deve ter o endpoint GET /user
app.get('/user',
validateToken, UserController.getAll);

// Requisito 4 - Sua aplicação deve ter o endpoint GET /user/:id
app.get('/user/:id',
validateToken, UserController.getById);

// Requisito 5 - Sua aplicação deve ter o endpoint POST /categories
app.post('/categories',
validateToken,
validateCateg, Categories.add);

// 6 - Sua aplicação deve ter o endpoint GET /categories
app.get('/categories',
  validateToken,
  Categories.getAll);

// Requisito 7 - Sua aplicação deve ter o endpoint POST /post
app.post('/post',
  validateToken,
  validatePost.validateTitleAndContent2,
  validatePost.validateCategoryIds,
  PostController.add);

// Requisito 8 - Sua aplicação deve ter o endpoint GET /post
app.get('/post',
validateToken,
PostController.getAll);

// Requisito 9 - Sua aplicação deve ter o endpoint GET post/:id
app.get('/post/:id',
validateToken,
PostController.getById);

//  Requisito 10 - Sua aplicação deve ter o endpoint PUT /post/:id
app.put('/post/:id',
validateToken,
validatePost.validateTitleAndContent,
validatePost.validateUpdate,
PostController.update);

// Requisito 11 - Sua aplicação deve ter o endpoint DELETE post/:id

app.delete('/post/:id',
  validateToken,
  validatePost.validateDelete,
  PostController.remove);

// Requisito 12 - Sua aplicação deve ter o endpoint DELETE /user/me

app.delete('/user/me',
  validateToken,
  UserController.remove);
