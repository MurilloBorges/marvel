/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import api from '../services/api';
import IconSVG from '../components/Ui/IconSVG';

const loading = (payload) => ({
  type: 'LOADER',
  payload,
});

const setUpdateDate = (payload) => ({
  type: 'UPDATEDATE',
  payload,
});

const setComics = (payload) => ({
  type: 'COMICS',
  payload,
});

export default function Comics({ history }) {
  const storage = useSelector((store) => store);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  async function getComics() {
    try {
      dispatch(loading({ loading: true }));
      await api
        .get('comics')
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            dispatch(setComics([...res.data]));
            dispatch(setUpdateDate({ updateDate: new Date() }));
          }
        })
        .catch((error) => {
          toast.error(`Falha na requisição: ${error}`);
          console.log(error);
        })
        .finally(() => {
          dispatch(loading({ loading: false }));
        });
    } catch (error) {
      toast.error(`Falha na requisição: ${error}`);
    }
  }

  useEffect(() => {
    toast.configure();
    const now = moment(new Date());
    const past = moment(storage.updateDate);
    const duration = moment.duration(now.diff(past));

    // Só realiza a consulta se o storage de categorias estiver vazio
    // ou se a data da última requisição for maior que 1 hora
    if (storage.comics.length === 0 || duration.asHours() > 1) {
      getComics();
    }
  }, []);

  function handleSubmit(category) {
    history.push({
      pathname: '/drinks',
      search: `?query=${category}`,
    });
  }

  return (
    <div className="comics">
      <h1>Comics</h1>
      <button
        type="button"
        className="comics-reload"
        data-cy="button-reload"
        onClick={() => getComics()}
      >
        <IconSVG icon="refresh" height="4rem" width="4rem" fill="#224074" />
      </button>
      <div className="comics-search">
        <input
          type="text"
          placeholder="Search"
          data-cy="input-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="comics-container">
        {storage.comics
          .filter((e) =>
            e.strCategory.toUpperCase().includes(search.toUpperCase())
          )
          .map((data, index) => (
            <div className="comics-category" key={index.toString()}>
              <button
                type="button"
                data-cy="button-get-drinks"
                onClick={() => handleSubmit(data.strCategory)}
              >
                <IconSVG
                  icon="search"
                  height="3rem"
                  width="3rem"
                  fill="#00BEE9"
                />
                {data.strCategory}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
