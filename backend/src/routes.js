import { Router } from 'express';

import User from './controllers/UserController';
import authMiddleware from './middlewares/auth';
import Authenticate from './controllers/AuthenticateController';
import Password from './controllers/PasswordController';
import Character from './controllers/CharacterController';

const routes = new Router();

// USER
routes.post('/users', User.store);

// AUTHENTICATE
routes.post('/authenticate', Authenticate.store);
routes.use(authMiddleware);

// USER
routes.get('/users', User.index);
routes.get('/users/:id', User.show);
routes.delete('/users/:id', User.delete);
routes.patch('/users/:id', User.update);

// PASSWORD USER
routes.post('/users/:id/passwords', Password.store);

// CHARACTER
routes.get('/characters', Character.index);
routes.get('/characters/:id', Character.show);

export default routes;
