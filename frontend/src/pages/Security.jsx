/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../helpers/functions';
import api from '../services/api';

const loading = (payload) => ({
  type: 'LOADER',
  payload,
});

const setUser = (payload) => ({
  type: 'USER',
  payload,
});

export default function Security({ history }) {
  const storage = useSelector((store) => store);
  const dispatch = useDispatch();
  const [security, setSecurity] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    toast.configure();
  }, []);

  function handleInput({ currentTarget: { value, name } }) {
    setSecurity({
      ...security,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEmpty(security.oldPassword)) {
      return toast.error('Enter the old password');
    }
    if (isEmpty(security.newPassword)) {
      return toast.error('Enter the new password');
    }

    if (security.newPassword !== security.confirmNewPassword) {
      return toast.error('Invalid password confirmation');
    }

    try {
      dispatch(loading({ loading: true }));
      await api
        .post(`users/${storage.user._id}/passwords`, {
          oldPassword: security.oldPassword,
          newPassword: security.newPassword,
        })
        .then((res) => {
          if (res.status === 201) {
            toast.success('Change successfully saved');
            history.push('/comics');
          }
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
    <div className="login-container profile">
      <form onSubmit={handleSubmit}>
        <h1>Your security</h1>
        <input
          type="password"
          className="form-control"
          id="oldPassword"
          name="oldPassword"
          value={security.oldPassword}
          onChange={handleInput}
          data-cy="oldPassword"
          placeholder="Type your old password"
        />
        <input
          type="password"
          className="form-control"
          id="newPassword"
          name="newPassword"
          value={security.newPassword}
          data-cy="newPassword"
          onChange={handleInput}
          placeholder="Type your new password"
        />
        <input
          type="password"
          className="form-control"
          id="confirmNewPassword"
          name="confirmNewPassword"
          value={security.confirmNewPassword}
          data-cy="confirmNewPassword"
          onChange={handleInput}
          placeholder="Type your password confirmation"
        />
        <button type="submit" className="btn btn-danger" data-cy="entrar">
          Update password
        </button>
      </form>
    </div>
  );
}
