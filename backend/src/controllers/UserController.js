/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import User from '../models/User';
import { generateToken } from './AuthenticateController';
import { isEmpty } from '../helpers/funcoes';

class UserController {
  async index(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (isEmpty(user)) {
        return res.status(404).json({ error: 'Usuário não cadastrado' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const existsUser = await User.findOne({ email: req.body.email });

      if (existsUser) {
        return res
          .status(400)
          .json({ error: 'Já existe uma conta vinculada a este e-mail' });
      }

      const { _id, name, email } = await User.create(req.body);

      return res.status(201).json({
        user: {
          _id,
          name,
          email,
        },
        token: generateToken({ id: _id }),
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const { name } = req.body;

      const user = await User.findById(req.params.id);

      if (isEmpty(user)) {
        return res.status(404).json({ error: 'Usuário não cadastrado' });
      }

      await User.findByIdAndUpdate(req.params.id, {
        name,
      });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (isEmpty(user)) {
        return res.status(404).json({ error: 'Usuário não cadastrado' });
      }

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new UserController();
