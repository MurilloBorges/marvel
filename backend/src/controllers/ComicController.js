import { isEmpty, isNotEmpty } from '../helpers/functions';
import api from '../service/api';
import Auth from '../service/authentication';
import FavoriteComic from '../models/FavoriteComic';

class ComicController {
  async index(req, res) {
    try {
      const data = await api.get(
        `/v1/public/comics?ts=${Auth.ts}&apikey=${Auth.apikey}&hash=${Auth.hash}`
      );

      const favoritesComics = await FavoriteComic.find({
        user: req.userId
      });

      const comics = {
        ...data.data.data,
        results: data.data.data.results.map((result) => ({
          ...result,
          favorite: {
            ...Object.values(favoritesComics).filter(
              (favorite) => favorite.comicId === result.id
            ).map((favorite) => ({
              favorite: isNotEmpty(favorite._doc._id),
              id: favorite._doc._id || '',
            }))[0],
          }
        })),
      };
      res.json(comics);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res, next) {
    try {
      if (req.params.id === 'favorites') {
        return next('route');
      }

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
