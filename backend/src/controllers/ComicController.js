import { isEmpty } from '../helpers/functions';
import api from '../service/api';
import Auth from '../service/authentication';

class ComicController {
  async index(req, res) {
    try {
      const comics = await api.get(
        `/v1/public/comics?ts=${Auth.ts}&apikey=${Auth.apikey}&hash=${Auth.hash}`
      );
      return res.json(comics.data.data);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res) {
    try {
      const comic = await api.get(
        `/v1/public/comics/${req.params.id}?ts=${Auth.ts}&apikey=${Auth.apikey}&hash=${Auth.hash}`
      );

      if (isEmpty(comic)) {
        return res.status(404).json({ error: 'Comic not found.' });
      }

      return res.json(comic.data.data);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new ComicController();
