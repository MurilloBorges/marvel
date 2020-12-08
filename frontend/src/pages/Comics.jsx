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
            dispatch(setComics([...res.data.results]));
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

  async function handleFavorite(id, index) {
    const comics = {
      ...storage.comics,
      [index]: {
        ...storage.comics[index],
        favorite: !storage.comics[index].favorite,
      },
    };
    dispatch(setComics(Object.values(comics).map((comic) => ({ ...comic }))));
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
          .filter((e) => e.title.toUpperCase().includes(search.toUpperCase()))
          .map((data, index) => (
            <div className="comics-comic" key={index.toString()}>
              <button
                className="comics-comic-favorite"
                type="button"
                data-cy="button-comic-favorite"
                onClick={() => handleFavorite(data.id, index)}
              >
                <IconSVG
                  icon="star-full"
                  height="4rem"
                  width="4rem"
                  fill={data.favorite ? '#FFD700' : '#f9e4a7'}
                  className="comics-comic-favorite"
                />
              </button>
              <img
                src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                alt={`comic-${index.toString()}`}
              />
              <button
                className="comics-comic-get-datails"
                type="button"
                data-cy="button-get-details"
                onClick={() => handleSubmit(data.strCategory)}
              >
                <IconSVG
                  icon="search"
                  height="3rem"
                  width="3rem"
                  fill="#f0141e"
                />
                {data.title}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
