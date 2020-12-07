import { Router } from 'express';

import User from './controllers/UserController';
import authMiddleware from './middlewares/auth';
import Authenticate from './controllers/AuthenticateController';
import Password from './controllers/PasswordController';
import Character from './controllers/CharacterController';
import FavoriteCharacter from './controllers/FavoriteCharacterController';
import Comic from './controllers/ComicController';
import FavoriteComic from './controllers/FavoriteComicController';

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

// FAVORITE CHARACTER
routes.get('/characters/favorites', FavoriteCharacter.index);
routes.get('/characters/favorites/:id', FavoriteCharacter.show);
routes.post('/characters/:id/favorites', FavoriteCharacter.store);
routes.delete('/characters/favorites/:id', FavoriteCharacter.delete);

// COMIC
routes.get('/comics', Comic.index);
routes.get('/comics/:id', Comic.show);

// FAVORITE COMIC
routes.get('/comics/favorites', FavoriteComic.index);
routes.get('/comics/favorites/:id', FavoriteComic.show);
routes.post('/comics/:id/favorites', FavoriteComic.store);
routes.delete('/comics/favorites/:id', FavoriteComic.delete);

export default routes;
