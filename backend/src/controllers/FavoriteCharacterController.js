import * as Yup from 'yup';
import FavoriteCharacter from '../models/FavoriteCharacter';
import { isEmpty } from '../helpers/functions';

class FavoriteCharacterController {
  async index(req, res) {
    try {
      const favoritesCharacters = await FavoriteCharacter.find({
        user: req.userId,
      });
      res.json(favoritesCharacters);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res) {
    try {
      const favoriteCharacter = await FavoriteCharacter.findById(req.params.id);

      if (isEmpty(favoriteCharacter)) {
        return res.status(404).json({ error: 'Favorite character not found' });
      }

      return res.json(favoriteCharacter);
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

      const characterId = req.params.id;
      const { _id } = await FavoriteCharacter.create({
        user: req.userId,
        characterId,
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
      const favoriteCharacter = await FavoriteCharacter.findByIdAndDelete(
        req.params.id
      );

      if (isEmpty(favoriteCharacter)) {
        return res.status(404).json({ error: 'Favorite character not found' });
      }

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new FavoriteCharacterController();
