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

export default function Profile({ history }) {
  const storage = useSelector((store) => store);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    email: storage.user.email,
    name: storage.user.name,
  });

  useEffect(() => {
    toast.configure();
  }, []);

  function handleInput({ currentTarget: { value, name } }) {
    setProfile({
      ...profile,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isEmpty(profile.name)) {
      return toast.error('The name field is required');
    }

    try {
      dispatch(loading({ loading: true }));
      await api
        .patch(`users/${storage.user._id}`, {
          name: profile.name,
        })
        .then((res) => {
          if (res.status === 204) {
            toast.success('Change successfully saved');
            dispatch(setUser({ ...storage.user, name: profile.name }));
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
        <h1>Your profile</h1>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={profile.email}
          data-cy="email"
          disabled
        />
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={profile.name}
          data-cy="name"
          onChange={handleInput}
          placeholder="Type your name"
        />
        <button type="submit" className="btn btn-danger" data-cy="entrar">
          Update profile
        </button>
      </form>
    </div>
  );
}
