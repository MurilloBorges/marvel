import { isEmpty } from '../helpers/functions';
import api from '../service/api';
import Auth from '../service/authentication';
import FavoriteCharacter from '../models/FavoriteCharacter';

class CharacterController {
  async index(req, res) {
    try {
      const data = await api.get(
        `/v1/public/characters?ts=${Auth.ts}&apikey=${Auth.apikey}&hash=${Auth.hash}`
      );

      const favoritesCharacters = await FavoriteCharacter.find({
        user: req.userId
      });

      const characters = {
        ...data.data.data,
        results: data.data.data.results.map((result) => ({
          ...result,
          favorite: {
            ...Object.values(favoritesCharacters).filter(
              (favorite) => favorite.cahracterId === result.id
            ).map((favorite) => ({
              favorite: isNotEmpty(favorite._doc._id),
              id: favorite._doc._id || '',
            }))[0],
          }
        })),
      };
      res.json(characters);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res, next) {
    try {
      if (req.params.id === 'favorites') {
        return next('route');
      }

      const character = await api.get(
        `/v1/public/characters/${req.params.id}?ts=${Auth.ts}&apikey=${Auth.apikey}&hash=${Auth.hash}`
      );

      if (isEmpty(character)) {
        return res.status(404).json({ error: 'Character not found.' });
      }

      return res.json(character.data.data);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new CharacterController();
