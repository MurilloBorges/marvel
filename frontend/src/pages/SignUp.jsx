/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import IconSVG from '../components/Ui/IconSVG';
import api from '../services/api';
import { login } from '../services/authentication';
import { isEmpty } from '../helpers/funcoes';

const loading = (payload) => ({
  type: 'LOADER', payload,
});

export default function SignUp({ history }) {
  const dispatch = useDispatch();
  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    toast.configure();
  }, []);

  function handleInput({ currentTarget: { value, name } }) {
    setSignUp({
      ...signUp,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEmpty(signUp.name) || isEmpty(signUp.email) || isEmpty(signUp.password)) {
      return toast.error('Todos os campos são obrigatórios.');
    }
    try {
      dispatch(loading({ loading: true }));
      await api.post('/users', {
        name: signUp.name,
        email: signUp.email,
        password: signUp.password,
      }).then((res) => {
        toast.success('Usuário cadastrado com sucesso!');
        login(res.data.token);
        history.push('/busca-cep');
      }).catch((error) => {
        if (error.response.status === 400) {
          toast.info(error.response.data.error);
        }
      }).finally(() => {
        dispatch(loading({ loading: false }));
      });
    } catch (error) {
      toast.error(`Falha na requisição: ${error}`);
    }

    return true;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <IconSVG
          icon="user"
          height="10rem"
          width="10rem"
          fill="#666666"
        />
        <input
          type="text"
          autoFocus
          data-cy="name"
          name="name"
          placeholder="Digite seu nome"
          value={signUp.name}
          onChange={handleInput}
        />
        <input
          type="text"
          data-cy="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={signUp.email}
          onChange={handleInput}
        />
        <input
          type="password"
          data-cy="password"
          name="password"
          placeholder="Digite sua senha"
          value={signUp.password}
          onChange={handleInput}
        />
        <button type="submit" className="btn btn-info" data-cy="cadastrar">Cadastrar</button>
        <button type="button" className="btn btn-light" data-cy="login" onClick={() => history.push('/login')}>
          LOGIN
        </button>
      </form>
    </div>
  );
}
