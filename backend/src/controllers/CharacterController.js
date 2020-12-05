import 'dotenv/config';
import { isEmpty } from '../helpers/functions';
import api from '../service/api';

class CharacterController {
  async index(req, res) {
    try {
      const characters = await api.get(`/v1/public/characters?apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${process.env.MARVEL_PRIVATE_KEY}`)
      console.log(characters);
      res.json(characters);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res) {
    try {
      const character = await api.get(`/v1/public/characters/${req.params.id}?apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${process.env.MARVEL_PRIVATE_KEY}`);

      if (isEmpty(character)) {
        return res.status(404).json({ error: 'Character not found.' });
      }

      return res.json(character);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new CharacterController();
