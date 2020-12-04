import { Router } from 'express';

import User from './controllers/UserController';
import authMiddleware from './middlewares/auth';
import Authenticate from './controllers/AuthenticateController';
import Password from './controllers/PasswordController';

const routes = new Router();

// USUÁRIO
routes.get('/users', User.index);
routes.get('/users/:id', User.show);
routes.post('/users', User.store);

// AUTENTICAÇÃO
routes.post('/authenticate', Authenticate.store);
routes.use(authMiddleware);

// USUÁRIO
routes.delete('/users/:id', User.delete);
routes.patch('/users/:id', User.update);

// SENHA
routes.post('/users/:id/passwords', Password.store);

export default routes;
