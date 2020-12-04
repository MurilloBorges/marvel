/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { isEmpty } from '../helpers/funcoes';

class PasswordController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        oldPassword: Yup.string().required(),
        newPassword: Yup.string()
          .required()
          .min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const { oldPassword, newPassword } = req.body;

      const user = await User.findById(req.params.id).select('+password');

      if (isEmpty(user)) {
        return res.status(404).json({ error: 'Usuário não cadastrado' });
      }

      if (oldPassword && !(await bcrypt.compare(oldPassword, user.password))) {
        return res.status(400).json({ error: 'Senhas não correspondem' });
      }

      await User.findByIdAndUpdate(req.params.id, {
        password: newPassword,
      });

      return res.status(201).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new PasswordController();
