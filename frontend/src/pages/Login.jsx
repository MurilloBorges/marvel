/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { isEmpty } from '../helpers/functions';
import IconSVG from '../components/Ui/IconSVG';
import api from '../services/api';
import { login } from '../services/authentication';

const loading = (payload) => ({
  type: 'LOADER',
  payload,
});

const setUser = (payload) => ({
  type: 'USER',
  payload,
});

export default function Login({ history }) {
  const dispatch = useDispatch();
  const [authenticate, setAuthenticate] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    toast.configure();
  }, []);

  function handleInput({ currentTarget: { value, name } }) {
    setAuthenticate({
      ...authenticate,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEmpty(authenticate.email) || isEmpty(authenticate.password)) {
      return toast.error('Preencha o e-mail e a senha para continuar.');
    }
    try {
      dispatch(loading({ loading: true }));
      await api
        .post('/authenticate', {
          email: authenticate.email,
          password: authenticate.password,
        })
        .then((res) => {
          dispatch(setUser({ ...res.data.user }));
          login(res.data.token);
          history.push('/comics');
        })
        .catch((error) => {
          if ([400, 401, 404].includes(error.response.status)) {
            toast.info(error.response.data.error);
          }
        })
        .finally(() => {
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
        <div className="login-icons">
          <IconSVG icon="user" height="8rem" width="8rem" fill="#f0141e" />
          <IconSVG icon="marvel" height="12rem" width="12rem" fill="#fff" />
        </div>
        <input
          type="text"
          autoFocus
          data-cy="email"
          name="email"
          placeholder="Type your e-mail"
          value={authenticate.email}
          onChange={handleInput}
        />
        <input
          type="password"
          data-cy="password"
          name="password"
          placeholder="Type your password"
          value={authenticate.password}
          onChange={handleInput}
        />
        <button type="submit" className="btn btn-danger" data-cy="entrar">
          Entrar
        </button>
        <button
          type="button"
          className="btn btn-light"
          data-cy="cadastrar"
          onClick={() => history.push('/sign-up')}
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
}
