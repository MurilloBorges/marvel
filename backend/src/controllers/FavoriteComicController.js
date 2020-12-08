import * as Yup from 'yup';
import FavoriteComic from '../models/FavoriteComic';
import { isEmpty } from '../helpers/functions';

class FavoriteComicController {
  async index(req, res) {
    try {
      const favoritesComics = await FavoriteComic.find({
        user: req.userId,
      });
      res.json(favoritesComics);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res) {
    try {
      const favoriteComic = await FavoriteComic.findById(req.params.id);

      if (isEmpty(favoriteComic)) {
        return res.status(404).json({ error: 'Favorite comic not found' });
      }

      return res.json(favoriteComic);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
      });

      if (!(await schema.isValid(req.params))) {
        return res.status(400).json({ error: 'Field validations incorrect' });
      }

      const comicId = req.params.id;
      const { _id } = await FavoriteComic.create({
        user: req.userId,
        comicId,
      });

      return res.status(201).json({
        _id,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req, res) {
    try {
      const favoriteComic = await FavoriteComic.findByIdAndDelete(
        req.params.id
      );

      if (isEmpty(favoriteComic)) {
        return res.status(404).json({ error: 'Favorite comic not found' });
      }

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new FavoriteComicController();
