import { isEmpty } from '../helpers/functions';
import api from '../service/api';
import Auth from '../service/authentication';

class CharacterController {
  async index(req, res) {
    try {
      const characters = await api.get(
        `/v1/public/characters?ts=${Auth.ts}&apikey=${Auth.apikey}&hash=${Auth.hash}`
      );
      res.json(characters.data.data);
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
